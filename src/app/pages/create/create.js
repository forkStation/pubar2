import tpl from './create.jade'
import './create.scss'
import { angular, ionic } from 'library'
import imgSrc from 'assets/images'
export default angular.module('create',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('create', {
                url: '/create',
                controllerAs: 'vm',
                controller: CreateController,
                template: tpl()
            })
    });


class CreateController {
    constructor () {
        "ngInject"
        this.name = 'create';
        this.picWall = imgSrc.barAvatarDemo;
    }
}