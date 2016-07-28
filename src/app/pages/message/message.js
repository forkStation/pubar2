import tpl from './message.jade'
import './message.scss'
import { angular, ionic } from 'library'

export default angular.module('message',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('message', {
                url: '/message',
                controllerAs: 'vm',
                controller: MessageController,
                template: tpl(),
                resolve:{
                    'getMsgList':function(resourcePool){
                        return resourcePool.getMsgList.request({});
                    }
                }
            })
    });


class MessageController {
    constructor (getMsgList,application,$ionicSlideBoxDelegate) {
        "ngInject"
        this.name = 'message';
        this.msgList = getMsgList.data.info;
        this.friendList = [];
        this.applyList = [];
        this.onmeList = [];
        this.headHost = application.headHost;
        this.application = application;

        this.slideBox = $ionicSlideBoxDelegate;
        this.index = 0;
        this.headHost = application.headHost;
        this.windowHeight = document.documentElement.clientHeight - document.getElementById('group-tabs').clientHeight;
        let _this = this;

        for(var i =0;i<_this.msgList.length;i++){
            if(_this.msgList[i]['type'] == 1) {
                console.log(1);
                _this.friendList.push(_this.msgList[i]);
            }
            if(_this.msgList[i]['type']==2) {
                _this.applyList.push(_this.msgList[i]);
            }
            if(_this.msgList[i]['type']==7){
                console.log(7);
                _this.onmeList.push(_this.msgList[i])
            }
        }

        /**
         * type 1:好友关注 2：酒局申请 3：同意加入酒吧，4：拒绝加入酒局 5：酒吧已接单 6：酒吧不接单，7：酒局邀请提醒  8：酒局过期通知  9：拒绝邀请酒局
         */

    }
    changeTabs(index){
        this.slideBox.slide(index);
        this.index = index;
    }
}