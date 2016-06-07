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
                template: tpl()
            })
    });


class IndexController {
    constructor($scope,$ionicSlideBoxDelegate,$http,token){
        "ngInject"
        this.name = 'index';
        this.barAvatarDemo = imgResource.barAvatarDemo

        $http.get('api/bar/barfriend_list').success(res=>{
            console.log(res);
        })

        token.getToken()
        token.userId = 123
        token.getToken('dsa')
        token.getToken('dadass')
        token.getToken('dsadasdsadsac')
        console.log(token.loginToken);

        $scope.slideIndex = 0;
        $scope.goSlide = function(index){
            $ionicSlideBoxDelegate.slide(index);
        };


    }
}

