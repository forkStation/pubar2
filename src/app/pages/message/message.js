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
                template: tpl()
            })
    });


class MessageController {
    constructor () {
        "ngInject"
        this.name = 'message'
    }
}