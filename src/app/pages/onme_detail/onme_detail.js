import tpl from './onme_detail.jade'
import './onme_detail.scss'
import { angular, ionic } from 'library'

export default angular.module('onme_detail',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('onme_detail', {
                url: '/onme_detail',
                controllerAs: 'vm',
                controller: Onme_detailController,
                template: tpl()
            })
    });


class Onme_detailController {
    constructor () {
        "ngInject"
        this.name = 'onme_detail'
    }
}