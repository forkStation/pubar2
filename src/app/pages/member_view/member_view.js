import tpl from './member_view.jade'
import './member_view.scss'
import { angular, ionic } from 'library'

export default angular.module('member_view',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('member_view', {
                url: '/member_view/:id',
                controllerAs: 'vm',
                controller: Member_viewController,
                template: tpl(),
                resolve:{
                    userInfo: function(resourcePool,$stateParams,application){
                        return resourcePool.getUserInfo.request({
                            userid:$stateParams.id,
                            myid:application.userId
                        })
                    }
                }
            })
    });
class Member_viewController {
    constructor (userInfo,resourcePool,application,$stateParams,$ionicPopup,$ionicLoading) {
        "ngInject"
        this.name = 'member_view';
        this.item = userInfo.data.info;
        this.resourcePool = resourcePool;
        this.application = application;
        this.stateParams = $stateParams;
        this.popup = $ionicPopup;
        this.loading = $ionicLoading;
    }
    addFriend(){
        let t = this;
        t.popup.show({
            title:'提示',
            template:'是否申请将'+t.item.nickname+'加为好友',
            buttons:[{
                text:'确定',
                onTap:function(){
                    t.resourcePool.addFriend.request({
                        fid:t.stateParams.id,
                        userid:t.application.userId
                    }).then(res=>{
                        if(res.data.status===1){
                            t.loading.show({
                                template:'发送好友申请成功，请等候通过验证',
                                duration:1500
                            })
                        }
                    },res=>{
                        t.loading.show({
                            template:'系统出错,请稍后再试',
                            duration:1500
                        })
                    })
                }
            },{
                text:'取消'
            }]
        })
    }
}