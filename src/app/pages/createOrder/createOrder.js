import tpl from './createOrder.jade'
import './createOrder.scss'
import { angular, ionic } from 'library'

export default angular.module('createOrder',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('createOrder', {
                url: '/createOrder',
                controllerAs: 'vm',
                controller: CreateOrderController,
                template: tpl()
            })
    });


class CreateOrderController {
    constructor ($ionicPopup,$scope) {
        "ngInject"
        this.name = 'createOrder';
        this.payWays = 0;
        this.popup = $ionicPopup;
        this.scope = $scope;
        $scope.password = '2222';
    }
    changePay(type){
        this.payWays = type;

    }
    toPay(){
        let t = this;
        t.popup.show({
            title:'输入支付密码',
            template:'<span>本色酒吧</span><p class="order-price">&yen;1800.0</p><codebox password="password"></codebox>',
            buttons:[{
                text:'确定',
                onTap:function(){
                    console.log(t)
                }
            }]
        })
    }
}