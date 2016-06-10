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
                        const login = resourcePool.login;
                        return login.request({ a: '2' })
                    },
                    add: function(resourcePool,login,token){
                        const add = resourcePool.getBarList;
                        return add.request({ userId:token.userId })
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

