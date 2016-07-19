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
    constructor (getMsgList,application) {
        "ngInject"
        this.name = 'message';
        this.msgList = getMsgList.data.info;
        this.headHost = application.headHost;
        /**
         * type 1:好友关注 2：酒局申请 3：同意加入酒吧，4：拒绝加入酒局 5：酒吧已接单 6：酒吧不接单，7：酒局邀请提醒  8：酒局过期通知  9：拒绝邀请酒局
         */
    }
}