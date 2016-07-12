import tpl from './messageMemberView.jade'
import './messageMemberView.scss'
import { angular, ionic } from 'library'

export default angular.module('messageMemberView',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('messageMemberView', {
                url: '/messageMemberView/:id',
                controllerAs: 'vm',
                controller: MessageMemberViewController,
                template: tpl(),
                resolve:{
                    userInfo: function(resourcePool,$stateParams){
                        return resourcePool.getUserInfo.request({
                            fid:$stateParams.id
                        })
                    }
                }
            })
    });


class MessageMemberViewController {
    constructor (userInfo,resourcePool,application,$stateParams,$ionicPopup,$ionicLoading) {
        "ngInject"
        this.name = 'messageMemberView';
        this.item = userInfo.data.info;
        this.resourcePool = resourcePool;
        this.application = application;
        this.stateParams = $stateParams;
        this.popup = $ionicPopup;
        this.loading = $ionicLoading;
    }
    confirm(id){
        let t = this;
        t.resourcePool.receiveFreind.request({
            fid:id,
            userid:t.application.userId
        }).then(res=>{
            if(res.data.status ==1){
                t.loading.show({
                    template:"已同意",
                    duration:1000
                });
                window.setTimeout(function(){
                    window.history.go(-1);

                },1000)
            }else{
                t.loading.show({
                    template:res.data.info,
                    duration:1000
                });
            }
        })
    }
    reject(id){
        let t = this;
        t.resourcePool.rejectFriend.request({
            fid:id,
            userid:t.application.userId
        }).then(res=>{
            if(res.data.status ==1){
                t.loading.show({
                    template:"已拒绝",
                    duration:1000
                });
                window.setTimeout(function(){
                    window.history.go(-1);

                },1000)
            }else{
                t.loading.show({
                    template:res.data.info,
                    duration:1000
                });
            }
        })
    }
}