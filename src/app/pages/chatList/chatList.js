import tpl from './chatList.jade'
import './chatList.scss'
import { angular, ionic } from 'library'

export default angular.module('chatList',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('chatList', {
                url: '/chatList',
                controllerAs: 'vm',
                controller: ChatListController,
                template: tpl()
            })
    });


class ChatListController {
    constructor ($ionicPopup) {
        "ngInject"
        this.name = 'chatList';
        this.popup = $ionicPopup;
    }
    deleteChat(){
        let t = this;
        t.popup.show({
            title:'提示',
            template:'是否删除此信息？',
            buttons:[{
                text:'确定',
                onTap:function(){

                }
            },{
                text:'取消'
            }]
        })
    }
}