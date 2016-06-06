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
    constructor($scope,$ionicSlideBoxDelegate,$ionicModal,$state,$http,token){
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

        $scope.filterModal = $ionicModal.fromTemplate('<filter>',{
            scope: $scope,
            animation: 'slide-in-up'
        });
        $scope.openFilterModal = function(){
            $scope.filterModal.show();
        };
        $scope.closeFilterModal = function(){
            $scope.filterModal.hide();
        };
        //当我们用到模型时，清除它！
        $scope.$on('$destroy',function(){
            $scope.filterModal.remove();
        });
        // 当隐藏的模型时执行动作
        $scope.$on('modal.hide',function(){
            // 执行动作
        });
        // 当移动模型时执行动作
        $scope.$on('modal.removed',function(){
            // 执行动作
        });


        $scope.locationModal = $ionicModal.fromTemplate('<location>',{
            scope: $scope,
            animation: 'slide-in-up'
        });
        $scope.openLocationModal = function(){
            $scope.locationModal.show();
        };
        $scope.closeLocationModal = function(){
            $scope.locationModal.hide();
        };
        this.goBarDetail = function(){
            $state.go('barDetail')
        };
        this.goGroupDetail = function(){
            $state.go('groupDetail');
        }
    }
}

