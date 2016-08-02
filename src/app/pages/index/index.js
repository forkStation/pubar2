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
                template: tpl()
            })
    });

class IndexController {
    constructor($scope,$ionicSlideBoxDelegate,$state,application,resourcePool,$ionicLoading){
        "ngInject"
        this.name = 'index';
        this.state = $state;
        this.slideIndex = 0;
        this.windowHeight = document.documentElement.clientHeight - document.getElementById('header-menu').clientHeight;
        this.scope = $scope;
        let t = this;
        this.barPages = 1;
        this.partyPages = 1;
        this.barLoadMore = true;
        this.partyLoadMore = true;
        this.ionicSlide = $ionicSlideBoxDelegate;
        this.cityName = application.getMyCity();
        this.imgHost = application.imgHost;
        this.headHost = application.headHost;
        this.resource = resourcePool;
        this.application = application;
        this.loading = $ionicLoading;
        this.sortKey = 'sort_order';
        this.bars = [];
        this.parties = [];
        this.sortHeight = 0;


        /**
         * 解决安卓初始化无法下拉加载的bug
         */
        this.loadMoreBars(true);
        this.loadMoreParty(true);

    }
    goSlide = function (index){
        this.ionicSlide.slide(index);
        this.slideIndex = index;
    };
    loadMoreBars(init){

        this.initBars = init || false;
        if(!this.initBars){
            return false;
        }
        let _this = this;
        let resourcePool = _this.resource;
        let $scope = _this.scope;
        let application = _this.application;
        resourcePool.getBarList.request({
            city:application.getMyCity(),
            page:_this.barPages
        }).then(res =>{
            if(_this.barPages >= ~~res.data.pageCount){
                _this.barLoadMore = false;
            }
            _this.bars = _this.bars.concat(res.data.info || []);
            console.log(_this.bars);
            _this.barPages = _this.barPages + 1;

        });

        $scope.$broadcast('scroll.infiniteScrollComplete');
    }
    loadMoreParty(init){
        this.initParty = init || false;
        if(!this.initParty){
            return false;
        }
        let _this = this;
        let resourcePool = _this.resource;
        let application = _this.application;
        resourcePool.getPartyList.request({
            city:application.getMyCity(),
            page:_this.partyPages,
            size:10
        }).then(res =>{
            if(_this.partyPages >= ~~res.data.pageCount){
                _this.partyLoadMore = false;
            }
            _this.parties = _this.parties.concat(res.data.info || []);
            console.log(_this.parties);
            for(var i = 0;i<_this.parties.length;i++){
                _this.parties[i].amount = ~~_this.parties[i]['girlCount'] + ~~_this.parties[i]['boyCount'];
            }

            _this.partyPages = _this.partyPages + 1;

        });
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


