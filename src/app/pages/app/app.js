import tpl from './app.jade'
import './app.scss'
import { angular, ionic } from 'library'

export default angular.module('app',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('app', {
                url: '/app',
                controllerAs: 'vm',
                controller: AppController,
                template: tpl()
            })
    });


class AppController {
    constructor (application) {
        "ngInject"
        this.name = 'app';
        this.bitmap = application.assets+'bitmap.png';
        this.logo = application.assets+'bar-logo.png';

    }
}