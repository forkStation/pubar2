import tpl from './createOrder.jade'
import './createOrder.scss'
import { angular, ionic } from 'library'

export default angular.module('createOrder',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('createOrder', {
                url: '/createOrder/:orderid/:genre?partyid?money',
                controllerAs: 'vm',
                controller: CreateOrderController,
                template: tpl()
            })
    });


class CreateOrderController {
    constructor ($ionicPopup,$scope,$ionicLoading,resourcePool,$stateParams,application,$ionicModal,$state,$location) {
        "ngInject"
        this.name = 'createOrder';
        this.payWays = 0; // 0:余额支付  1:支付宝   2:微信支付
        this.popup = $ionicPopup;
        this.scope = $scope;

        this.loading = $ionicLoading;
        $scope.password = '';
        this.resourcePool = resourcePool;
        this.stateParams = $stateParams;


        this.application = application;
        this.ionicModal = $ionicModal;
        this.genre = $stateParams.genre;
        let _this = this;

        _this.isRecharge = false;
        _this.isWechat = application.platform() == 'wechat';
        /**
         * 如果是走的充值流程
         * @type {*|string}
         */
        this.rechargeMoney = this.stateParams.money;
        console.log(this.rechargeMoney);
        if(this.rechargeMoney > 0 && this.rechargeMoney){
            _this.isRecharge = true;

        }else{
            if(this.genre == 0){
                resourcePool.getConfirmOrderInfo.request({
                    id:$stateParams.orderid,
                    genre:$stateParams.genre
                }).then(res=>{
                    _this.orderInfo = res.data.info
                    _this.orderInfo.orderId = $stateParams.orderid;
                    _this.orderId = _this.orderInfo.head;
                    _this.payId = _this.orderInfo.id;
                })
            }
            if(this.genre == 1){
                resourcePool.getConfirmOrderInfo.request({
                    genre:$stateParams.genre,
                    partyid:$stateParams.partyid
                }).then(res=>{
                    _this.orderInfo = res.data.info
                    _this.orderInfo.orderId = $stateParams.orderid;
                    _this.orderId = _this.orderInfo.head;
                    _this.payId = _this.orderInfo.id;
                })
            }
        }

        this.state = $state;
        let t = this;
        console.log(this.stateParams.money);
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

        /**
         * 开启默认微信支付
         */
        if(_this.isWechat){
            _this.application.wxConfig($location.absUrl());
            _this.payWays = 2;
        }

    }
    changePay(type){
        this.payWays = type;
    }
    toPay(){
        let $modal = this.ionicModal;
        let $scope = this.scope;

        if(this.payWays == 2) {
            this.confirm();

            return false;
        }

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
        if(t.payWays == 2 && t.stateParams.money){
            resourcePool.recharge.request({
                money:t.stateParams.money
            }).then(res=>{
                if(res.data.status ===1){
                    var appInfo = JSON.parse(res.data.info);
                    t.application.wechatPay(appInfo,()=>{
                        t.application.info('提示','充值成功',function(){
                            window.history.go(-1);
                        })

                    },(res)=>{
                        $loading.show({
                            template:res,
                            duration:1000
                        })
                    })
                }
            })
        }

        if(t.payWays == 2 && !t.stateParams.money){
            resourcePool.setOrderPay.request({
                id:t.payId
            }).then(res=>{
                if(res.data.status ==1){
                    var appInfo = JSON.parse(res.data.info);
                    t.application.wechatPay(appInfo,()=>{
                        t.application.info('温馨提示','支付成功',function(){
                            window.location.href = '/successInfo/'+t.stateParams.orderId+'/'+t.stateParams.genre
                      
                        });

                        t.application.sendMsg(t.userInfo.id,10,0,0)
                    },(res)=>{
                        $loading.show({
                            template:res,
                            duration:1000
                        })
                    })
                }else{
                    t.loading.show({
                        template:res.data.info,
                        duration:1000
                    })
                }
            });
        }
    }
}