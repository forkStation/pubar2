import tpl from './setting.jade'
import './setting.scss'
import { angular, ionic } from 'library'

export default angular.module('setting',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('setting', {
                url: '/setting',
                controllerAs: 'vm',
                controller: SettingController,
                template: tpl()
            })
    });


class SettingController {
    constructor () {
        "ngInject"
        this.name = 'setting'
    }
}