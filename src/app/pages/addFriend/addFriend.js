import tpl from './addFriend.jade'
import './addFriend.scss'
import { angular, ionic } from 'library'

export default angular.module('addFriend',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('addFriend', {
                url: '/addFriend',
                controllerAs: 'vm',
                controller: AddFriendController,
                template: tpl()
            })
    });


class AddFriendController {
    constructor (resourcePool,application,$ionicHistory) {
        "ngInject"
        this.name = 'addFriend';
        this.word = '';
        this.resource = resourcePool;
        this.headHost = application.headHost;
        this.history = $ionicHistory;
    }
    doSearch(){
        let t = this;
        t.resource.searchUser.request({
            word:t.word
        }).then(res=>{
            t.list = res.data.info;
        })
    }
    goBack(){
        window.history.go(-1);
    }
}