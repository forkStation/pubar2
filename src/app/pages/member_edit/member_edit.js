import tpl from './member_edit.jade'
import './member_edit.scss'
import { angular, ionic } from 'library'
import imgSrc from 'assets/images'

export default angular.module('member_edit',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('member_edit', {
                url: '/member_edit',
                controllerAs: 'vm',
                controller: Member_editController,
                template: tpl()
            })
    });


class Member_editController {
    constructor () {
        "ngInject"
        this.name = 'member_edit';
        this.wall = imgSrc.barAvatarDemo;
    }
}