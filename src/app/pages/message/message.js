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
    constructor (getMsgList,application,$ionicSlideBoxDelegate,resourcePool) {
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
        this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
        this.newMsg = [];
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
            if(_this.msgList[i]['status']==0 && _this.msgList[i]['receiver'] == _this.userInfo.id){
                _this.newMsg.push(_this.msgList[i]['id']);
            }
        }
        resourcePool.updateMsg.request({
            ids:_this.newMsg.join(',')
        });

        /**
         * type 1:好友关注 2：酒局申请 3：同意加入酒吧，4：拒绝加入酒局 5：酒吧已接单 6：酒吧不接单，7：酒局邀请提醒  8：酒局过期通知  9：拒绝邀请酒局   10 成功加入对方的酒局 11 酒局支付成功提醒 12 退款提醒
         */

    }
    changeTabs(index){
        this.slideBox.slide(index);
        this.index = index;
    }
}