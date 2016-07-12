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
    constructor ($ionicPopup,$scope,getOrderInfo,$ionicLoading,resourcePool,$stateParams) {
        "ngInject"
        this.name = 'createOrder';
        this.payWays = 0;
        this.popup = $ionicPopup;
        this.scope = $scope;
        this.orderInfo = getOrderInfo.data.info;
        this.orderInfo.orderId = $stateParams.orderid;
        console.log(this.orderInfo);
        this.loading = $ionicLoading;
        $scope.password = '';
        this.resourcePool = resourcePool;
        this.stateParams = $stateParams;
    }
    changePay(type){
        this.payWays = type;
    }

    toPay(){
        let t = this;
        var $loading = t.loading;
        t.popup.show({
            title:'输入支付密码',
            template:'<span class="barName">{{vm.orderInfo.barinfo.name}}</span><p class="order-price">{{vm.orderInfo.money | currency:"￥"}}</p><codebox password="password"></codebox>',
            buttons:[{
                text:'确定',
                onTap:function(){
                    if(this.scope.password =='131646'){
                        t.resourcePool.setOrderPay.request({
                            id:t.stateParams.orderid
                        }).then(res=>{
                            console.log(res)
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