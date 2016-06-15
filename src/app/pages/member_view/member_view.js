import tpl from './member_view.jade'
import './member_view.scss'
import { angular, ionic } from 'library'

export default angular.module('member_view',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('member_view', {
                url: '/member_view',
                controllerAs: 'vm',
                controller: Member_viewController,
                template: tpl()
            })
    });


class Member_viewController {
    constructor () {
        "ngInject"
        this.name = 'member_view'
    }
}