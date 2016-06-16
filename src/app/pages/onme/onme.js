import tpl from './onme.jade'
import './onme.scss'
import { angular, ionic } from 'library'

export default angular.module('onme',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('onme', {
                url: '/onme',
                controllerAs: 'vm',
                controller: OnmeController,
                template: tpl()
            })
    });


class OnmeController {
    constructor () {
        "ngInject"
        this.name = 'onme'
    }
}