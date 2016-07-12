import tpl from './accountList.jade'
import './accountList.scss'
import { angular, ionic } from 'library'

export default angular.module('accountList',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('accountList', {
                url: '/accountList',
                controllerAs: 'vm',
                controller: AccountListController,
                template: tpl()
            })
    });


class AccountListController {
    constructor () {
        "ngInject"
        this.name = 'accountList'
        this.payWay = 1;
    }
    changePay(type){
        this.payWay = type;

    }
}