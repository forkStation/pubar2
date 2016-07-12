import tpl from './addAccount.jade'
import './addAccount.scss'
import { angular, ionic } from 'library'

export default angular.module('addAccount',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('addAccount', {
                url: '/addAccount',
                controllerAs: 'vm',
                controller: AddAccountController,
                template: tpl()
            })
    });


class AddAccountController {
    constructor () {
        "ngInject"
        this.name = 'addAccount'
    }
}