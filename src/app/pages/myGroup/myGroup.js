import tpl from './myGroup.jade'
import './myGroup.scss'
import { angular, ionic } from 'library'

export default angular.module('myGroup',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('myGroup', {
                url: '/myGroup',
                controllerAs: 'vm',
                controller: MyGroupController,
                template: tpl()
            })
    });


class MyGroupController {
    constructor ($ionicSlideBoxDelegate) {
        "ngInject"
        this.name = 'myGroup';
        this.slideIndex = 0;
        this.goSlide = function(index){
            $ionicSlideBoxDelegate.slide(index);
        };

    }
}