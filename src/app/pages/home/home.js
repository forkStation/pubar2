import tpl from './home.jade'
import './home.scss'
import { angular, ionic } from 'library'

export default angular.module('home',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('home', {
                url: '/',
                controllerAs: 'vm',
                controller: HomeController,
                template: tpl()
            })
    });


class HomeController {
    constructor () {
        "ngInject"
        console.log("dasd dasd");
        
        this.name = 'wj'
    }
}