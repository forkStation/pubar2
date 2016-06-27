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
                            userid:application.userId
                        })
                    }
                }
            })
    });


class MemberController {
    constructor (userInfo,$ionicLoading) {
        "ngInject"
        this.name = 'member';
        this.productItem = imgResource.productItem;
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