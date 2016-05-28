'use strict';
import { angular, ionic } from 'library'
import appComponent from './app.component'
import pagesModule from './pages/app.pages'

angular
    .module('pubarApp', [
        ionic,
        pagesModule.name,
        appComponent.name
    ])
    .config(($locationProvider, $urlRouterProvider) => {
        "ngInject";
        $urlRouterProvider.otherwise('/');
        // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
        // #how-to-configure-your-server-to-work-with-html5mode
        $locationProvider.html5Mode(true).hashPrefix('!');
    })

