import tpl from './phoneLogin.jade'
import './phoneLogin.scss'
import { angular, ionic } from 'library'

export default angular.module('phoneLogin',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('phoneLogin', {
                url: '/phoneLogin',
                controllerAs: 'vm',
                controller: PhoneLoginController,
                template: tpl()
            })
    });


class PhoneLoginController {
    constructor (application) {
        "ngInject"
        this.name = 'phoneLogin';
        this.bitmap = application.assets+'bitmap.png';
        this.logo = application.assets+'bar-logo.png';
    }
}