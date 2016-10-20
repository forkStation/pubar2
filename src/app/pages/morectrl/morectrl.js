import tpl from './morectrl.jade'
import './morectrl.scss'
import { angular, ionic } from 'library'

export default angular.module('morectrl',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('morectrl', {
                url: '/morectrl/:id',
                controllerAs: 'vm',
                controller: MorectrlController,
                template: tpl()
            })
    });


class MorectrlController {
    constructor ($ionicActionSheet,$ionicPopup,resourcePool,$stateParams,$ionicLoading) {
        "ngInject"
        this.name = 'morectrl';
        this.actionSheet = $ionicActionSheet;
        this.popup = $ionicPopup;
        this.resourcePool = resourcePool;
        this.stateParams = $stateParams;
        this.loading = $ionicLoading;
    }

    //弹出底部菜单
    openAction(){
        let t = this;
        t.actionSheet.show({
            buttons: [
                { text: '确定' }
            ],
            titleText:'加入黑名单后对方将无法看到你任何信息',
            cancelText:'取消',
            buttonClicked:function(index){
                if(index===0){

                    t.popup.show({
                        title:'已加入黑名单',
                        template:'可以在设置-黑名单里解除',
                        buttons:[{text:'确定',onTap:function(){
                            return true;
                        }}]

                    });

                }
            }
        })
    }
    cancelFriend(){
        let t = this;
        t.actionSheet.show({
            buttons: [
                { text: '确定' }
            ],
            titleText:'取消关注此人吗？',
            cancelText:'取消',
            buttonClicked:function(index){
                if(index===0){
                    t.resourcePool.cancelFriendFollow.request({
                        fid:t.stateParams.id
                    }).then(res=>{
                        if(res.data.status == 1){
                            t.loading.show({
                                template:'已移除关注',
                                duration:1500
                            });
                            window.setTimeout(()=>{
                                window.history.go(-1);
                            },1500)
                        }else{
                            t.loading.show({
                                template:res.data.info,
                                duration:1500
                            })
                        }
                    })
                }
            }
        })
    }
}