import tpl from './createOrder.jade'
import './createOrder.scss'
import { angular, ionic } from 'library'

export default angular.module('createOrder',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('createOrder', {
                url: '/toPay/orderPay?orderid?genre?partyid?money',
                controllerAs: 'vm',
                controller: CreateOrderController,
                template: tpl()
            })
    });


class CreateOrderController {
    constructor ($ionicPopup,$scope,$ionicLoading,resourcePool,$stateParams,application,$ionicModal,$state) {
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
        _this.partyid = $stateParams.partyid;

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
            t.confirm(args);
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
        if(this.payWays == 0){
            $scope.modal = $modal.fromTemplate('<password on-hide="vm.hideModal()"  password="password" ></password>',{
                scope: $scope,
                animation: 'slide-in-up'
            });
            $scope.modal.show();
            return false;
        }

      
    }

    hideModal(){
        this.scope.modal.hide();
    }
    confirm(args){
        let resourcePool = this.resourcePool;
        let $loading = this.loading;
        let t = this;

        let ua = window.navigator.userAgent.toLowerCase();


        /**
         * 微信支付 -- 充值操作
         */
        if(t.payWays == 2 && t.stateParams.money){


            if(ua.indexOf('iphone')>=0){
                window.location.replace('/createOrder/payRedirect?type=recharge&id='+t.stateParams.money);
            }else{
                t.state.go('payRedirect',{type:'recharge',id:t.stateParams.money});
            }

        }

        /**
         * 微信支付 -- 创建组局,加入别人的酒局操作
         */
        if(t.payWays == 2 && !t.stateParams.money){
            if(this.genre ==1){
                if(ua.indexOf('iphone')>=0){
                    window.location.replace('/createOrder/payRedirect?type=order&id='+t.payId+'&to='+t.userInfo.id+'&orderid='+t.stateParams.orderid+'&genre='+t.stateParams.genre+'&partyid='+t.stateParams.partyid);
                }else{
                    t.state.go('payRedirect',{
                        type:'order',
                        id:t.payId,
                        to:t.userInfo.id,
                        orderid:t.stateParams.orderid,
                        genre:t.stateParams.genre
                    });
                }


            }else{
                if(ua.indexOf('iphone')>=0){
                    window.location.replace('/createOrder/payRedirect?type=order&id='+t.payId+'&orderid='+t.stateParams.orderid+'&genre='+t.stateParams.genre);
                }else{
                    t.state.go('payRedirect',{
                        type:'order',
                        id:t.payId,
                        orderid:t.stateParams.orderid,
                        genre:t.stateParams.genre
                    });
                }
            }
        }
        if(t.payWays == 0 && !t.stateParams.money){
            if(!args){
                t.loading.show({
                    template:'请输入支付密码',
                    duration:1000
                })
                return false;
            }
            t.resourcePool.setWalletPay.request({
                paypwd:args,
                id:t.payId
            }).then( res=>{
                if(res.data.status ==1 ){
                    console.log(t.orderId,t.genre,t.partyid);
                    // window.location.replace('/successInfo/'+t.orderId+'/'+t.genre+'/'+t.partyid);
                }else{
                    t.loading.show({
                        template:res.data.info,
                        duration:1500
                    })
                }
            })

        }
    }
}