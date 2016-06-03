import tpl from './pocket.jade'
import './pocket.scss'
import { angular, ionic } from 'library'

export default angular.module('pocket',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('pocket', {
                url: '/pocket',
                controllerAs: 'vm',
                controller: PocketController,
                template: tpl()
            })
    });


class PocketController {
    constructor () {
        "ngInject"
        this.name = 'pocket'
    }
}