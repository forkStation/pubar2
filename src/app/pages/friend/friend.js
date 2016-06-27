import tpl from './friend.jade'
import './friend.scss'
import { angular, ionic } from 'library'
import img from 'assets/images'
export default angular.module('friend',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('friend', {
                url: '/friend',
                controllerAs: 'vm',
                controller: FriendController,
                template: tpl(),
                resolve:{
                    friendList:function(resourcePool,application){
                        return resourcePool.getFriendList.request({
                            userid:application.userId
                        })
                    }
                }
            })
    });


class FriendController {
    constructor (friendList,application) {
        "ngInject"
        this.name = 'friend';
        this.chatGroupImg = img.chatGroupImg;
        this.chatFansImg = img.chatFansImg;
        this.friendList = friendList.data.info;
        console.log(this.friendList)
        this.imgHost = application.headHost;
    }
}