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
                url: '/barDetail/:id?reload',
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
    constructor ($ionicSlideBoxDelegate,$state,detail,application,groupList,getBarFriendList,$location,$scope,$stateParams,$ionicLoading) {
        "ngInject"
        this.barAvatarDemo=imgResource.barAvatarDemo;
        this.name = 'barDetail';
        this.slideIndex = 0;
        this.state = $state;
        this.windowHeight = document.documentElement.clientHeight - document.getElementById('store').clientHeight;
        this.loading = $ionicLoading;
        this.goSlide = function(index){
            $ionicSlideBoxDelegate.$getByHandle('listSlide').slide(index);
        };
        this.barid = $stateParams.id;

        this.goGroupDetail = function(item){
            $state.go('groupDetail');
        };
        this.barInfo = detail.data.info;
        this.application = application;

        /**
         * 解决jssdk无法触发的bug
         */

        $scope.$on('$stateChangeSuccess',function () {
            if(window.isWechat){
                application.wxConfig($location.absUrl());
            }
        })
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

        $scope.$on('share.command',function (e,target) {
            _this.shareCommand(target)
        });

    }
    applyMe(){
        this.state.go('productList')
    }
    createParty(id){
        if(this.barInfo.isbooking==1){
            this.state.go('create',{barid:id})
        }else{
            this.loading.show({
                template:'该酒吧暂时不可以组局',
                duration:1500
            })
        }
    }
    openWxMap(){
        let _application = this.application;
        let _barInfo = this.barInfo;
        let latitude = _barInfo.latitude;
        let longitude = _barInfo.longitude;
        _application.openWxMap({
            latitude,longitude
        },_barInfo.name,_barInfo.address)
    }

    shareCommand(target){
        let _this = this;
        let _application = _this.application;
        let _barInfo = _this.barInfo;
        _application.openWxShare(target,{
            title:"蒲吧分享:"+_barInfo.name,
            content:_barInfo.details,
            link:'h5.pubar.me/barDetail/'+_barInfo.id,
            success:function () {
                _application.info('提示','分享成功')
            }
        })
    }
}