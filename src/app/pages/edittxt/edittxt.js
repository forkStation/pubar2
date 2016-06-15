import tpl from './edittxt.jade'
import './edittxt.scss'
import { angular, ionic } from 'library'

export default angular.module('edittxt',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('edittxt', {
                url: '/edittxt',
                controllerAs: 'vm',
                controller: EdittxtController,
                template: tpl()
            })
    });


class EdittxtController {
    constructor () {
        "ngInject"
        this.name = 'edittxt';
       
    }
}