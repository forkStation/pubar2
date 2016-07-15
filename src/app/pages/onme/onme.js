import tpl from './onme.jade'
import './onme.scss'
import { angular, ionic } from 'library'

export default angular.module('onme',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('onme', {
                url: '/onme/:id?barid',
                controllerAs: 'vm',
                controller: OnmeController,
                template: tpl()
            })
    });


class OnmeController {
    constructor ($stateParams) {
        "ngInject"
        this.name = 'onme';

        console.log($stateParams.barid)
        console.log($stateParams.id)
    }
}