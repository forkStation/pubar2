import tpl from './recharge.jade'
import './recharge.scss'
import { angular, ionic } from 'library'

export default angular.module('recharge',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('recharge', {
                url: '/recharge',
                controllerAs: 'vm',
                controller: RechargeController,
                template: tpl()
            })
    });


class RechargeController {
    constructor ($ionicModal,$ionicLoading,$ionicPopup,$scope,resourcePool,application) {
        "ngInject"
        this.name = 'recharge';

        this.payWay = 1;
        this.ionicModal = $ionicModal;
        this.loading = $ionicLoading;
        this.popup = $ionicPopup;
        this.scope = $scope;
        this.passowrd = '';
        this.resourcePool = resourcePool;
        this.application = application;
        this.form = {
            money:''
        };
        let t = this;
        $scope.$on('password.confirm',function(event,args){
            t.passowrd = args;
            t.confirm();
        })
    }
    changePay(type){
        this.payWay = type;
    }
    openModal(){
        let $loading = this.loading;
        let $modal = this.ionicModal;
        let $popup = this.popup;
        let $scope = this.scope;

        if(!/^\d+$/.test(this.form.money)){
            $loading.show({
                template:'请输入正确的充值金额',
                duration:1000
            });
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
        let form = this.form;
        let $loading = this.loading;
        let t = this;

        resourcePool.recharge.request({
            money:form.money
        }).then(res=>{
            if(res.data.status ===1){
                var appInfo = JSON.parse(res.data.info);
                t.application.wechatPay(appInfo,()=>{
                    $loading.show({
                        template:'充值成功',
                        duration:1000
                    });
                    window.setTimeout(function(){
                        window.history.go(-1);
                    },1000)

                },()=>{
                    $loading.show({
                        template:'充值失败或取消',
                        duration:1000
                    })
                })
            }
        })
    }


}