import tpl from './collect.jade'
import './collect.scss'
import { angular, ionic } from 'library'
import imgResource from 'assets/images'

export default angular.module('collect',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('collect', {
                url: '/collect',
                controllerAs: 'vm',
                controller: CollectController,
                template: tpl()
            })
    });


class CollectController {
    constructor () {
        "ngInject"
        this.name = 'collect';
        this.barAvatarDemo = imgResource.barAvatarDemo
    }
}