import tpl from './groupDetail.jade'
import './groupDetail.scss'
import { angular, ionic } from 'library'

export default angular.module('groupDetail',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('groupDetail', {
                url: '/groupDetail',
                controllerAs: 'vm',
                controller: GroupDetailController,
                template: tpl()
            })
    });


class GroupDetailController {
    constructor () {
        "ngInject"
        this.name = 'groupDetail'
    }
}