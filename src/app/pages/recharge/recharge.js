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
    constructor () {
        "ngInject"
        this.name = 'recharge';

        this.payWay = 1;
    }
    changePay(type){
        this.payWay = type;

    }

}