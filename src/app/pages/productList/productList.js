import tpl from './productList.jade'
import './productList.scss'
import { angular, ionic } from 'library'
import imgResource from 'assets/images'

export default angular.module('productList', [ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('productList', {
                url: '/productList/:id',
                controllerAs: 'vm',
                controller: ProductListController,
                template: tpl(),
                resolve:{
                    'getDrinkList':function(resourcePool,$stateParams){
                        return resourcePool.getDrinkList.request({
                            barid:$stateParams.id
                        })
                    },
                    'getBarInfo':function(resourcePool,$stateParams){
                        return resourcePool.getBarInfo.request({
                            barid:$stateParams.id
                        })
                    }
                }
            })
    });


class ProductListController {
    constructor ($ionicBackdrop,getDrinkList,getBarInfo,application,storedb) {
        "ngInject";
        ProductListController.$ionicBackdrop=$ionicBackdrop;
        this.distance = '4.32km';
        this.barAvatarDemo=imgResource.barAvatarDemo;
        this.list = getDrinkList;
        this.barInfo = getBarInfo.data.info;
        this.imgHost = application.imgHost;
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

        this.total = 10;
        this.price = 10000;

        //设置现在的标签
        this.activeCate = this.category[0].name;
        this.category[0].isActive = true;

        this.items = [
            {
                title: '鸡腿堡',
                _title: '好吃的大鸡',
                price: 18.0,
                img: '',
                id:'dsf324123dae144',
                num:1
            },
            {
                title: '酒名酒名酒名酒名酒名酒名酒名酒名酒名酒名酒名酒名',
                _title: '介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
                price: 100000,
                img: '',
                id:'ga12sdafaacacs441',
                num:3
            },
            {
                title: '酒名酒名酒名酒名酒名酒名酒名酒名酒名酒名酒名酒名',
                _title: '介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
                price: 100000,
                img: '',
                id:'f123aasd',
                num:0
            },
            {
                title: '酒名酒名酒名酒名酒名酒名酒名酒名酒名酒名酒名酒名',
                _title: '介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
                price: 100000,
                img: '',
                id:'123',
                num:1
            },
            {
                title: '酒名酒名酒名酒名酒名酒名酒名酒名酒名酒名酒名酒名',
                _title: '介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
                price: 100000,
                img: '',
                id:'321312',
                num:2
            },
            {
                title: '酒名酒名酒名酒名酒名酒名酒名酒名酒名酒名酒名酒名',
                _title: '介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
                price: 100000,
                img: '',
                id:'01212312412412',
                num:10
            }
        ]
    }

    setActive (cate) {
        this.category.forEach(function (val, key) {
            val.isActive = false;
        });
        cate.isActive = true;
        this.activeCate = cate.name;
    }
    getNumber(item){
        console.log(item)
    }

}