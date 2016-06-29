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
    constructor () {
        "ngInject"
        this.name = 'createOrder';
        this.payWays = 0;
    }
    changePay(type){
        this.payWays = type;

    }
}