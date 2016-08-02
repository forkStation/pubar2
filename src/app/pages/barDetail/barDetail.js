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
                    },
                    barFriendAdd:function(resourcePool,$stateParams,application){
                        return resourcePool.addBarFriend.request({
                            barid:$stateParams.id,
                            userid:application.userId
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
        this.windowHeight = document.documentElement.clientHeight - document.getElementById('store').clientHeight;
        this.goSlide = function(index){
            $ionicSlideBoxDelegate.$getByHandle('listSlide').slide(index);
        };
        this.goGroupDetail = function(item){
            $state.go('groupDetail');
        };
        this.barInfo = detail.data.info;

        /**
         * 去掉空图片
         * @type {Array|*}
         */
        this.imagesArray = this.barInfo.pic.split('||');
        let images = this.imagesArray;
        let length = images.length;
        for(var i = 0;i<length;i++){
            if(!images[i]){
                images.splice(i,1)
            }
        }

        /**
         * 页面渲染的初始赋值
         * @type {string|*}
         */
        this.headHost = application.headHost;
        this.imgHost = application.imgHost;
        this.groupList = groupList.data.info;

        this.friends = getBarFriendList.data.info;
        let _this = this;
        for(var i = 0;i<_this.groupList.length;i++){
            _this.groupList[i].amount = ~~_this.groupList[i]['girlCount'] + ~~_this.groupList[i]['boyCount'];
        }

    }
    applyMe(){
        this.state.go('productList')
    }
    createParty(id){
        this.state.go('create',{barid:id})
    }
}