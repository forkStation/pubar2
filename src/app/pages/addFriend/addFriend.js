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
    constructor () {
        "ngInject"
        this.name = 'addFriend'
    }
}