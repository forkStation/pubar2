import tpl from './payRedirect.jade'
import './payRedirect.scss'
import { angular, ionic } from 'library'

export default angular.module('payRedirect',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('payRedirect', {
                url: '/createOrder/payRedirect?type?genre?id?orderid?to',
                controllerAs: 'vm',
                controller: PayRedirectController,
                template: tpl()
            })
    });


class PayRedirectController {
    constructor (resourcePool,$ionicLoading,application,$location,$stateParams) {
        "ngInject"
        this.name = 'payRedirect';
        this.url = $location.absUrl();
        // this.type = this.getParams('type');
        // this.resultID = this.getParams('id');
        // this.to = this.getParams('to');
        // this.orderid = this.getParams('orderid');
        // this.genre = this.getParams('genre');

        application.wxConfig($location.absUrl());

        this.type = $stateParams.type || this.getParams('type');
        this.resultID =$stateParams.id || this.getParams('id');
        this.to = $stateParams.to || this.getParams('to');
        this.orderid = $stateParams.orderid || this.getParams('orderid');
        this.genre = $stateParams.genre || this.getParams('genre');
        this.partyid = $stateParams.partyid || this.getParams('partyid');
        let _this = this;
        if(_this.type === 'recharge'){
            resourcePool.recharge.request({
                money:_this.resultID
            }).then(res=>{
                if(res.data.status ===1){
                    var appInfo = res.data.info;
                    application.wechatPay(appInfo,()=>{
                        application.info('提示','充值成功',function(){
                            window.location.replace('/pocket')
                        })
                    },res=>{
                       window.history.go(-1)
                    })
                }
            })
        }
        if(_this.type === 'order'){
            resourcePool.setOrderPay.request({
                id:_this.resultID
            }).then(res=>{
                if(res.data.status ==1){
                    var appInfo = res.data.info;
                    application.wechatPay(appInfo,()=>{
                        application.info('温馨提示','支付成功',function(){
                            window.location.replace('/successInfo/'+_this.orderid+'/'+_this.genre+'/'+_this.partyid);
                        });
                        if(_this.genre == 1){
                            application.sendMsg(_this.to,10,0,0)
                        }

                    },(res)=>{
                        $ionicLoading.show({
                            template:res,
                            duration:1000
                        });
                        window.setTimeout(function () {
                            window.history.go(-1)
                        },1000);

                    })
                }else{
                    $ionicLoading.show({
                        template:res.data.info,
                        duration:1000
                    })
                }
            });
        }

    }

    getParams(name){
        var location = this.url;
        var link = location.substr(location.lastIndexOf("?") + 1, location.length + 1);
        var arr = link.split("&");
        var obj = {};
        for (let i = 0; i < arr.length; i++) {
            obj[arr[i].substring(0, arr[i].indexOf("=")).toLowerCase()] = arr[i].substring(arr[i].indexOf("=") + 1, arr[i].length);
        }
        var returnValue = obj[name.toLowerCase()];
        if (typeof(returnValue) == "undefined") {
            return "";
        } else {
            return returnValue;
        }
    }
}