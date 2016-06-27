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
                        'ngInject'
                        let login=resourcePool.login;
                        return login.request({})
                    },
                    barList:function(resourcePool,application,login){

                        return resourcePool.getBarList.request({
                            city:application.getMyCity()
                        })
                    },
                    partyList:function(resourcePool,application,login){
                        return resourcePool.getPartyList.request({
                            city:application.getMyCity()
                        });
                    }
                }
            })
    });

class IndexController {
    constructor($scope,$ionicSlideBoxDelegate,$state,barList,application,partyList,$ionicScrollDelegate){
        "ngInject"
        this.name = 'index';
        this.barAvatarDemo = imgResource.barAvatarDemo;
        this.state = $state;
        $scope.slideIndex = 0;
        $scope.goSlide = function(index){
            $ionicSlideBoxDelegate.slide(index);
            $ionicScrollDelegate.$getByHandle('mainScroll').resize();
        };
        this.cityName = application.getMyCity();
        this.bars = barList.data.info;
        this.imgHost = application.imgHost;
        this.partyList = partyList.data.info;
        this.headHost = application.headHost;
    }
    goGroupDetail(id){
        let t = this;
        t.state.go('groupDetail',{id:id});
    }
}


