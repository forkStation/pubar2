import tpl from './createOrder.jade'
import './createOrder.scss'
import { angular, ionic } from 'library'

export default angular.module('createOrder',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('createOrder', {
                url: '/createOrder/:orderid/:genre?partyid',
                controllerAs: 'vm',
                controller: CreateOrderController,
                template: tpl(),
                resolve:{
                    getOrderInfo:function(resourcePool,$stateParams){
                        let genre = $stateParams.genre;
                        if(genre == 0){
                            return resourcePool.getConfirmOrderInfo.request({
                                id:$stateParams.orderid,
                                genre:$stateParams.genre
                            })
                        }
                        if(genre == 1){
                            return resourcePool.getConfirmOrderInfo.request({
                                genre:$stateParams.genre,
                                partyid:$stateParams.partyid
                            })
                        }
                    }
                }
            })
    });


class CreateOrderController {
    constructor ($ionicPopup,$scope,getOrderInfo,$ionicLoading,resourcePool,$stateParams,application,$ionicModal) {
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
        this.orderId = this.orderInfo.head;
        this.payId = this.orderInfo.id;
        this.application = application;
        this.ionicModal = $ionicModal;
        this.genre = $stateParams.genre;
        let t = this;
        $scope.$on('password.confirm',function(event,args){
            $scope.passowrd = args;
            t.confirm();
        });

        if(this.genre == 1) {
            resourcePool.getPartyInfo.request({
                partyid:$stateParams.partyid
            }).then(res=>{
                t.userInfo = res.data.info.user;
            })
        }

    }
    changePay(type){
        this.payWays = type;
    }
    toPay(){
        let $modal = this.ionicModal;
        let $scope = this.scope;

        $scope.modal = $modal.fromTemplate('<password on-hide="vm.hideModal()" password="password" ></password>',{
            scope: $scope,
            animation: 'slide-in-up'
        });
        $scope.modal.show();
    }

    hideModal(){
        this.scope.modal.hide();
    }
    confirm(){
        let resourcePool = this.resourcePool;
        let $loading = this.loading;
        let t = this;
        /**
         * 微信支付
         */
        if(t.payWays == 2){
            resourcePool.setOrderPay.request({
                id:t.payId
            }).then(res=>{
                var appInfo = JSON.parse(res.data.info);
                t.application.wechatPay(appInfo,()=>{
                    $loading.show({
                        template:'支付成功',
                        duration:1000
                    });
                    t.application.sendMsg(t.userInfo.id,10,0,0)
                },()=>{
                    $loading.show({
                        template:'支付失败或取消',
                        duration:1000
                    })
                })

            });
        }

    }


}