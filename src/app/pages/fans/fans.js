import tpl from './fans.jade'
import './fans.scss'
import { angular, ionic } from 'library'
import img from 'assets/images'
export default angular.module('fans',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('fans', {
                url: '/fans',
                controllerAs: 'vm',
                controller: FansController,
                template: tpl(),
                resolve:{
                    getFollowList:function(resourcePool,application){
                        return resourcePool.getFollowList.request({
                            userid:application.userId
                        })

                    }
                }
            })
    });


class FansController {
    constructor ($ionicSlideBoxDelegate,getFollowList,application) {
        "ngInject"
        this.name = 'fans';
        this.slideIndex = 0;
        this.chatGroupImg = img.chatGroupImg;
        this.chatFansImg = img.chatFansImg;
        this.getFollowList = getFollowList.data.info;
        this.headHost = application.headHost;
        this.goSlide = function(index){
            $ionicSlideBoxDelegate.slide(index);
        };
    }
}