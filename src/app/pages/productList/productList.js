import tpl from './productList.jade'
import './productList.scss'
import { angular, ionic } from 'library'

export default angular.module('productList', [ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('productList', {
                url: '/productList',
                controllerAs: 'vm',
                controller: ProductListController,
                template: tpl()
            })
    });


class ProductListController {
    constructor () {
        "ngInject"
        this.pubname = 'The color 本色酒吧'
        this.address = '市民中心'
        this.distance = '4.32km'

        this.category = [
            {name: '热销'},
            {name: '新品推荐'},
            {name: '热销'},
            {name: '新品推荐'},
            {name: '热销'},
            {name: '新品推荐'},
            {name: '热销'},
            {name: '新品推荐'},
            {name: '热销'},
            {name: '新品推荐'},
            {name: '热销'},
            {name: '新品推荐'}
        ]
    }
}