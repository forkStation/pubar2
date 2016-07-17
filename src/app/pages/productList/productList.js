import tpl from './productList.jade'
import './productList.scss'
import { angular, ionic } from 'library'

export default angular.module('productList', [ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('productList', {
                url: '/productList/:id?partyid',
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
    constructor ($ionicBackdrop,getBarInfo,application,getDrinkCate,resourcePool,$stateParams,$state,$scope) {
        "ngInject";
        ProductListController.$ionicBackdrop=$ionicBackdrop;
        this.distance = '4.32km';
        this.barInfo = getBarInfo.data.info;
        this.category = getDrinkCate.data.info;
        this.imgHost = application.imgHost;
        this.productHost = application.productHost;
        this.resourcePool = resourcePool;
        this.stateParams = $stateParams;
        this.total = 0;
        this.price = 0;
        this.scope = $scope;
        this.$state = $state;
        //设置现在的标签
        this.activeCate = this.category[0].name;
        this.category[0].isActive = true;
        this.getData(this.category[0]['id']);
        this.getTotal();
        let t = this;

        $scope.$on('updateStorage',function(){
            t.getTotal();
            t.getChange();
        })
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
            t.scope.items = res.data.info;
            this.getChange();
        })
    }

    /**
     * 去结算
     */
    calculator(){
        var storageData = JSON.parse(window.localStorage.getItem('bar'+this.barInfo.id));
        let $state = this.$state;
        let $stateParams = this.stateParams;
        let t = this;
        this.resourcePool.createNewOrder.request({
            barid:$stateParams.id,
            cartItem:JSON.stringify(storageData),
            genre:0,
            partyid:$stateParams.partyid
        }).then(res=>{
            if(res.data.status==1){
                $state.go('createOrder',{orderid:res.data.info.id,genre:0})
                window.localStorage.removeItem('bar'+t.barInfo.id)
            }
        });
    }

    /**
     * 切换酒水分类的时候,让商品数量和本地的数据相等
     * @returns {boolean}
     */
    getChange(){

        let t = this;
        let $scope = t.scope;
        var storageData = JSON.parse(window.localStorage.getItem('bar'+t.barInfo.id));

        console.log($scope.items);

        $scope.$watch('items',function(oldValue,newValue){
            console.log(oldValue,newValue);
        })

        for(var i = 0;i<$scope.items.length;i++){
            for(var s = 0;s<storageData.length;s++){
                if($scope.items[i]['id']==storageData[s]['goodid']){
                    $scope.items[i].num = storageData[s]['number']
                }
            }
        }
        console.log($scope.items);

    }

    /**
     * 计算总价,总和
     */

    getTotal(){
        let t = this;
        var storageData = JSON.parse(window.localStorage.getItem('bar'+t.barInfo.id));
        t.price = 0;
        t.total = 0;
        angular.forEach(storageData,function(value,key){
            t.price = parseFloat(value.price*value.number) + t.price;
            t.total = parseInt(value.number)+t.total;

        });

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