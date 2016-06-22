'use strict'
import tpl from './barDetail.jade'
import './barDetail.scss'
import { angular, ionic } from 'library'
import imgResource from 'assets/images'

export default angular.module('barDetail',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('barDetail', {
                url: '/barDetail/:id',
                controllerAs: 'vm',
                controller: BarDetailController,
                template: tpl(),
                resolve:{
                    detail:function(resourcePool,$stateParams){
                        return resourcePool.getBarInfo.request({
                            'barid':$stateParams.id
                        })
                    },
                    groupList:function(resourcePool,$stateParams){
                        return resourcePool.getPartyList.request({
                            'barid':$stateParams.id
                        })
                    },
                    getBarFriendList:function(resourcePool,$stateParams){
                        return resourcePool.getBarFriendList.request({
                            'barid':$stateParams.id
                        })
                    }
                }
            })
    });


class BarDetailController {
    constructor ($ionicSlideBoxDelegate,$state,detail,application,groupList,getBarFriendList,$ionicScrollDelegate) {
        "ngInject"
        this.barAvatarDemo=imgResource.barAvatarDemo;

        this.name = 'barDetail';
        this.slideIndex = 0;
        this.state = $state;
        $ionicSlideBoxDelegate.$getByHandle('listSlide').stop();
        this.goSlide = function(index){
            $ionicSlideBoxDelegate.$getByHandle('listSlide').slide(index);
            $ionicScrollDelegate.$getByHandle('mainScroll').resize();
        };
        this.goGroupDetail = function(item){
            $state.go('groupDetail');
        };
        this.barInfo = detail.data.info;
        this.imgHost = application.imgHost;
        this.groupList = groupList.data.info;
        this.friends = getBarFriendList.data.info;
        console.log(this.barInfo);
   
    }
    applyMe(){
        this.state.go('productList')
    }
}