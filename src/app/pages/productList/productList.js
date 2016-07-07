import tpl from './productList.jade'
import './productList.scss'
import { angular, ionic } from 'library'

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
                    'getDrinkCate':function(resourcePool,$stateParams){
                        return resourcePool.getDrinkCate.request({
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
    constructor ($ionicBackdrop,getBarInfo,application,getDrinkCate,resourcePool,$stateParams) {
        "ngInject";
        ProductListController.$ionicBackdrop=$ionicBackdrop;
        this.distance = '4.32km';


        this.barInfo = getBarInfo.data.info;
        this.category = getDrinkCate.data.info;
        this.imgHost = application.imgHost;
        this.resourcePool = resourcePool;
        this.stateParams = $stateParams;
        this.total = 10;
        this.price = 10000;

        //设置现在的标签
        this.activeCate = this.category[0].name;
        this.category[0].isActive = true;
        this.getData(this.category[0]['id']);
    }

    /**
     * 切换分类的时候重新渲染商品列表
     * @param id
     */
    getData(id){
        let t = this;
        t.resourcePool.getDrinkList.request({
            barid:t.stateParams.id,
            type:id
        }).then(res=>{
            t.items = res.data.info;
            this.getChange();

        })
    }

    /**
     * 切换酒水分类的时候,让商品数量和本地的数据相等
     * @returns {boolean}
     */
    getChange(){
        let t = this;
        var storageData = JSON.parse(window.localStorage.getItem('bar'+t.barInfo.id));
        if(!storageData) return false;
        var items = t.items;
        for(var i = 0;i<items.length;i++){
            for(var s = 0;s<storageData.length;s++){
                if(items[i]['id']==storageData[s]['productId']){
                    items[i].num = storageData[s]['num']
                }
            }
        }
    }


    setActive (cate) {
        this.category.forEach(function (val, key) {
            val.isActive = false;
        });
        cate.isActive = true;
        this.activeCate = cate.name;
        this.getData(cate.id);

    }


}