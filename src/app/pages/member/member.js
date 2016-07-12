import tpl from './member.jade'
import './member.scss'
import { angular, ionic } from 'library'
import imgResource from 'assets/images'

export default angular.module('member',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('member', {
                url: '/member',
                controllerAs: 'vm',
                controller: MemberController,
                template: tpl(),
                resolve:{
                    userInfo:function(application,resourcePool){
                        return resourcePool.getUserInfo.request({
                        })
                    },
                    getMsgCount:function(resourcePool){
                        return resourcePool.getMsgCount.request({})
                    }
                }
            })
    });


class MemberController {
    constructor (userInfo,$ionicLoading,application,getMsgCount) {
        "ngInject"
        this.name = 'member';
        this.productItem = imgResource.productItem;
        this.headHost = application.headHost;
        this.msgCounts = getMsgCount.data.info[0]['count'];
        if(userInfo.data.status==1){
            this.userInfo = userInfo.data.info;
        }else{
            $ionicLoading.show({
                template:'系统繁忙，请稍后再试',
                duration:2000
            })
        }
    }
}