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
    constructor ($ionicSlideBoxDelegate,$state,detail,application,groupList,getBarFriendList) {
        "ngInject"
        this.barAvatarDemo=imgResource.barAvatarDemo;

        this.name = 'barDetail';
        this.slideIndex = 0;
        this.state = $state;
        this.goSlide = function(index){
            $ionicSlideBoxDelegate._instances[1].slide(index);
        };
        this.goGroupDetail = function(item){
            $state.go('groupDetail');
        };
        this.barInfo = detail.data.info;
        this.imgHost = application.imgHost;
        this.groupList = groupList.data.info;
        this.friends = getBarFriendList.data.info;
        console.log(this.barInfo);
        var mapArgs = {
            container:'map',
            longitude:this.barInfo.longitude,
            latitude:this.barInfo.latitude
        };
        application.map.open(mapArgs);

    }
    applyMe(){
        this.state.go('productList')
    }
}