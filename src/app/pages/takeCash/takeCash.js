import tpl from './takeCash.jade'
import './takeCash.scss'
import { angular, ionic } from 'library'

export default angular.module('takeCash',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('takeCash', {
                url: '/takeCash',
                controllerAs: 'vm',
                controller: TakeCashController,
                template: tpl()
            })
    });


class TakeCashController {
    constructor () {
        "ngInject"
        this.name = 'takeCash'
    }
}