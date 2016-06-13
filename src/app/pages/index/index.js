import tpl from './index.jade'
import './index.scss'
import { angular,ionic } from 'library'
import imgResource from 'assets/images'


export default angular.module('index',[ionic])
    .config(function($stateProvider){
        "ngInject"
        $stateProvider
            .state('index',{
                url: '/index',
                controllerAs: 'vm',
                controller: IndexController,
                template: tpl(),
                resolve: {
                    login: function(resourcePool){
                        let login=resourcePool.login;
                        return login.request({})
                    }
                }
            })
    });

class IndexController {
    constructor($scope,$ionicSlideBoxDelegate,$ionicModal,$state,login){
        "ngInject"
        this.name = 'index';
        this.barAvatarDemo = imgResource.barAvatarDemo;
        $scope.slideIndex = 0;
        $scope.goSlide = function(index){
            $ionicSlideBoxDelegate.slide(index);
        };
    }
}

