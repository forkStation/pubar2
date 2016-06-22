import tpl from './phoneSet.jade'
import './phoneSet.scss'
import { angular, ionic } from 'library'

export default angular.module('phoneSet',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('phoneSet', {
                url: '/phoneSet',
                controllerAs: 'vm',
                controller: PhoneSetController,
                template: tpl()
            })
    });


class PhoneSetController {
    constructor (application) {
        "ngInject"
        this.name = 'phoneSet';
        this.bitmap = application.assets+'bitmap.png';
        this.logo = application.assets+'bar-logo.png';
    }
}