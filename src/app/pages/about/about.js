/**
 * Created by wj on 2016/5/26.
 */
import { angular, ionic } from 'library'

export default angular.module('about', [ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('about', {
                url: '/about',
                controllerAs: 'vm',
                controller: AboutController,
                template: `
                    <h1>{{vm.name}}</h1>
                    <h2>{{vm.name2}}</h2>
                `
            })
    });


class AboutController{

    constructor () {
        "ngInject"
        this.name='about'
    }
}