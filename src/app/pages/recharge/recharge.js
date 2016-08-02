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
    constructor ($ionicModal,$ionicLoading,$ionicPopup,$scope,resourcePool,application,$state) {
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
        this.state = $state;
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


    confirm(){
        let $loading = this.loading;
        let t = this;
        if(t.form.money){
            this.state.go('createOrder',{money:t.form.money,orderid:0,genre:3})
        }else{
            $loading.show({
                template:'请输入正确的充值金额',
                duration:1000
            })
        }

    }


}