import tpl from './groupOrderList.jade'
import './groupOrderList.scss'
import { angular, ionic } from 'library'

export default angular.module('groupOrderList',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('groupOrderList', {
                url: '/groupOrderList',
                controllerAs: 'vm',
                controller: GroupOrderListController,
                template: tpl()
            })
    });


class GroupOrderListController {
    constructor () {
        "ngInject"
        this.name = 'groupOrderList'
    }
}