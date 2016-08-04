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

        this.ionicModal = $ionicModal;
        this.loading = $ionicLoading;
        this.popup = $ionicPopup;
        this.scope = $scope;
        this.resourcePool = resourcePool;
        this.application = application;
        this.state = $state;
        this.form = {
            money:''
        };
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