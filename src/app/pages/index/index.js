import tpl from './index.jade'
import './index.scss'
import { angular,ionic } from 'library'


export default angular.module('index',[ionic])
    .config(function($stateProvider){
        "ngInject"
        $stateProvider
            .state('index',{
                url: '/index',
                controllerAs: 'vm',
                controller: IndexController,
                template: tpl(),
                resolve: {

                    barList:function(resourcePool,application){

                        return resourcePool.getBarList.request({
                            city:application.getMyCity(),
                            userid:application.userId
                        })
                    },
                    partyList:function(resourcePool,application){
                        return resourcePool.getPartyList.request({
                            city:application.getMyCity()
                        });
                    }
                }
            })
    });

class IndexController {
    constructor($scope,$ionicSlideBoxDelegate,$state,barList,application,partyList,$ionicScrollDelegate,resourcePool,$ionicLoading){
        "ngInject"
        this.name = 'index';
        this.state = $state;
        $scope.slideIndex = 0;
        $scope.goSlide = function(index){
            $ionicSlideBoxDelegate.slide(index);
            $ionicScrollDelegate.$getByHandle('mainScroll').resize();
        };
        this.cityName = application.getMyCity();
        this.bars = barList.data.info;
        this.imgHost = application.imgHost;
        this.partyList = partyList.data.info;
        this.headHost = application.headHost;
        this.resource = resourcePool;
        this.application = application;
        this.loading = $ionicLoading;
        this.sortKey = 'sort_order';
        this.sortHeight = 0;
    }
    goGroupDetail(id){
        let t = this;
        t.state.go('groupDetail',{id:id});
    }

    goBarDetail(id){
        this.state.go('barDetail',{id:id});
    }
    collect(item){
        var status = item.isfollow;
        console.log(item);
        let t = this;
        if(status==1){
            t.resource.cancelBarFollow.request({
                    barid:item.id
                })
                .then(res=>{
                    if(res.data.status ==1){
                        t.loading.show({
                            template:'已取消收藏',
                            duration:1500
                        });
                        item.isfollow = 0;
                    }
                })
        }else{
            t.resource.addBarFollow.request({
                    userid:t.application.userId,
                    barid:item.id
                })
                .then(res=>{
                    if(res.data.status ==1){
                        t.loading.show({
                            template:'收藏成功',
                            duration:1500
                        });
                        item.isfollow = 1;
                    }
                })
        }
        return false;
    }
    sort(key){
        this.sortKey = key ;
        this.openSort = true;
        this.sortHeight = 2;
    }
}


