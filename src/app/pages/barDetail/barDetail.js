import tpl from './barDetail.jade'
import './barDetail.scss'
import { angular, ionic } from 'library'

export default angular.module('barDetail',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('barDetail', {
                url: '/barDetail',
                controllerAs: 'vm',
                controller: BarDetailController,
                template: tpl()
            })
    });


class BarDetailController {
    constructor ($ionicSlideBoxDelegate,$state) {
        "ngInject"
        this.name = 'barDetail';
        this.slideIndex = 0;

        console.log($ionicSlideBoxDelegate);
        this.goSlide = function(index){
            $ionicSlideBoxDelegate._instances[1].slide(index);
        };
        this.goGroupDetail = function(item){
            $state.go('groupDetail');
        }

    }
}