import tpl from './couponList.jade'
import './couponList.scss'
import { angular, ionic } from 'library'

export default angular.module('couponList',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('couponList', {
                url: '/couponList',
                controllerAs: 'vm',
                controller: CouponListController,
                template: tpl()
            })
    });


class CouponListController {
    constructor () {
        "ngInject"
        this.name = 'couponList'
    }
}