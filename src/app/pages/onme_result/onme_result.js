import tpl from './onme_result.jade'
import './onme_result.scss'
import { angular, ionic } from 'library'

export default angular.module('onme_result',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('onme_result', {
                url: '/onme_result',
                controllerAs: 'vm',
                controller: Onme_resultController,
                template: tpl()
            })
    });


class Onme_resultController {
    constructor () {
        "ngInject"
        this.name = 'onme_result'
    }
}