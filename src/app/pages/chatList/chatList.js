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
    constructor () {
        "ngInject"
        this.name = 'chatList'
    }
}