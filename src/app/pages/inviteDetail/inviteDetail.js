import tpl from './inviteDetail.jade'
import './inviteDetail.scss'
import { angular, ionic } from 'library'

export default angular.module('inviteDetail',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('inviteDetail', {
                url: '/inviteDetail',
                controllerAs: 'vm',
                controller: InviteDetailController,
                template: tpl()
            })
    });


class InviteDetailController {
    constructor () {
        "ngInject"
        this.name = 'inviteDetail'
    }
}