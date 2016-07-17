import tpl from './createOrder.jade'
import './createOrder.scss'
import { angular, ionic } from 'library'

export default angular.module('createOrder',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('createOrder', {
                url: '/createOrder/:orderid/:genre',
                controllerAs: 'vm',
                controller: CreateOrderController,
                template: tpl(),
                resolve:{
                    getOrderInfo:function(resourcePool,$stateParams){
                        return resourcePool.getConfirmOrderInfo.request({
                            id:$stateParams.orderid,
                            genre:$stateParams.genre
                        })
                    }
                }
            })
    });


class CreateOrderController {
    constructor ($ionicPopup,$scope,getOrderInfo,$ionicLoading,resourcePool,$stateParams,application) {
        "ngInject"
        this.name = 'createOrder';
        this.payWays = 0; // 0:余额支付  1:支付宝   2:微信支付
        this.popup = $ionicPopup;
        this.scope = $scope;
        this.orderInfo = getOrderInfo.data.info;
        this.orderInfo.orderId = $stateParams.orderid;
        this.loading = $ionicLoading;
        $scope.password = '';
        this.resourcePool = resourcePool;
        this.stateParams = $stateParams;
        this.payId = this.orderInfo.id;
        this.application = application;
    }
    changePay(type){
        this.payWays = type;
    }

    toPay(){
        let t = this;
        var $loading = t.loading;
        t.popup.show({
            title:'输入支付密码',
            template:'<span class="barName" style="color:#A7264D;font-size:.34rem">{{vm.orderInfo.barinfo.name}}酒吧</span><p class="order-price" style="font-size:.32rem;">{{vm.orderInfo.money | currency:"￥"}}</p><codebox password="password"></codebox>',
            buttons:[{
                text:'确定',
                onTap:function(){
                    if(this.scope.password =='131646'){
                        t.resourcePool.setOrderPay.request({
                            id:t.payId
                        }).then(res=>{
                            var appInfo = JSON.parse(res.data.info);
                            t.application.wechatPay(appInfo,()=>{
                                $loading.show({
                                    template:'支付成功',
                                    duration:1000
                                });

                            },()=>{
                                $loading.show({
                                    template:'支付失败或取消',
                                    duration:1000
                                })
                            })

                        });
                        return true;
                    }else{
                        $loading.show({
                            template:'支付密码错误',
                            duration:1000
                        })
                    }
                }
            },{text:'取消'}],
            scope:t.scope
        })
    }
}