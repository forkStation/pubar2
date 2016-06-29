import tpl from './productInfo.jade'
import './productInfo.scss'
import { angular, ionic } from 'library'

export default angular.module('productInfo',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('productInfo', {
                url: '/productInfo',
                controllerAs: 'vm',
                controller: ProductInfoController,
                template: tpl()
            })
    });


class ProductInfoController {
    constructor () {
        "ngInject"
        this.name = 'productInfo';
        this.total = 10
        this.price = 10000
    }
}