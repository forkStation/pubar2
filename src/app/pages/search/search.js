import tpl from './search.jade'
import './search.scss'
import { angular, ionic } from 'library'
import imgResource from 'assets/images'

export default angular.module('search',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('search', {
                url: '/search',
                controllerAs: 'vm',
                controller: SearchController,
                template: tpl()
            })
    });


class SearchController {
    constructor () {
        "ngInject"
        this.name = 'search';
        this.barAvatar = imgResource.barAvatarDemo;
        this.userAvatar = imgResource.productItem;

    }
}