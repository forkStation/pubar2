import tpl from './friend.jade'
import './friend.scss'
import { angular, ionic } from 'library'

export default angular.module('friend',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('friend', {
                url: '/friend',
                controllerAs: 'vm',
                controller: FriendController,
                template: tpl()
            })
    });


class FriendController {
    constructor () {
        "ngInject"
        this.name = 'friend'
    }
}