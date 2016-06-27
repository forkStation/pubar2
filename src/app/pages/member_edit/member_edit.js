import tpl from './member_edit.jade'
import './member_edit.scss'
import { angular, ionic } from 'library'
import imgSrc from 'assets/images'

export default angular.module('member_edit',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('member_edit', {
                url: '/member_edit',
                controllerAs: 'vm',
                controller: Member_editController,
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


class Member_editController {
    constructor ($ionicActionSheet,userInfo,$ionicLoading,resourcePool) {
        "ngInject"
        this.name = 'member_edit';
        this.wall = imgSrc.barAvatarDemo;
        this.actionSheet = $ionicActionSheet;
        this.resource = resourcePool;
        this.loading = $ionicLoading;
        if(userInfo.data.status==1){
            this.userInfo = userInfo.data.info;
        }else{
            $ionicLoading.show({
                template:'系统繁忙，请稍后再试',
                duration:2000
            })
        }
    }
    changeSex(){
        let t = this;
        let $ionicActionSheet = t.actionSheet;
        $ionicActionSheet.show({
            buttons: [
                { text: '男' },
                { text: '女' }
            ],
            titleText: '修改性别',
            cancelText: '取消',
            buttonClicked: function(index) {
                if(index===0){
                    t.userInfo.sex=1;
                }
                if(index===1){
                    t.userInfo.sex=0;
                }
                t.resource.userEdit.request({
                    sex:t.userInfo.sex,
                    userid:t.userInfo.id
                }).then(res=>{
                    console.log(res);
                    if(res.data.status != 1){
                        t.loading.show({
                            template:'Error：'+res.data.info,
                            duration:1500
                        })
                    }
                },()=>{
                    t.loading.show({
                        template:'系统繁忙，请稍后再试',
                        duration:1500
                    })
                });

                return true;
            }
        });

    }
}