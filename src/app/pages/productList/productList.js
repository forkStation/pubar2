import tpl from './productList.jade'
import './productList.scss'
import { angular, ionic } from 'library'
import imgResource from 'assets/images'

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
    constructor ($ionicBackdrop) {
        "ngInject";
        ProductListController.$ionicBackdrop=$ionicBackdrop;
        this.pubname = 'The color 本色酒吧';
        this.address = '市民中心';
        this.distance = '4.32km';
        this.barAvatarDemo=imgResource.barAvatarDemo;

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
        ];

        this.total = 10
        this.price = 10000

        //设置现在的标签
        this.activeCate = this.category[0].name;
        this.category[0].isActive = true;

        this.items = [
            {
                title: '酒名酒名酒名酒名酒名酒名酒名酒名酒名酒名酒名酒名',
                _title: '介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
                price: 100000,
                img: ''
            },
            {
                title: '酒名酒名酒名酒名酒名酒名酒名酒名酒名酒名酒名酒名',
                _title: '介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
                price: 100000,
                img: ''
            },
            {
                title: '酒名酒名酒名酒名酒名酒名酒名酒名酒名酒名酒名酒名',
                _title: '介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
                price: 100000,
                img: ''
            },
            {
                title: '酒名酒名酒名酒名酒名酒名酒名酒名酒名酒名酒名酒名',
                _title: '介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
                price: 100000,
                img: ''
            },
            {
                title: '酒名酒名酒名酒名酒名酒名酒名酒名酒名酒名酒名酒名',
                _title: '介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
                price: 100000,
                img: ''
            },
            {
                title: '酒名酒名酒名酒名酒名酒名酒名酒名酒名酒名酒名酒名',
                _title: '介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
                price: 100000,
                img: ''
            },
        ]
    }

    setActive (cate) {
        this.category.forEach(function (val, key) {
            val.isActive = false;
        });
        cate.isActive = true;
        this.activeCate = cate.name;
    }
    
}