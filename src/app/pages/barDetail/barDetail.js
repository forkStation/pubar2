import tpl from './barDetail.jade'
import './barDetail.scss'
import { angular, ionic } from 'library'
import imgResource from 'assets/images'

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
        this.barAvatarDemo=imgResource.barAvatarDemo;

        this.name = 'barDetail';
        this.slideIndex = 0;
        this.state = $state;
        this.goSlide = function(index){
            $ionicSlideBoxDelegate._instances[1].slide(index);
        };
        this.goGroupDetail = function(item){
            $state.go('groupDetail');
        }

    }
    applyMe(){
        this.state.go('productList')
    }
}