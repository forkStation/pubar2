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
                    },
                    barList:function(resourcePool,storedb,login){
                        var city = storedb.key('city').find();
                        if(!city){
                            city = '广州';
                        }else{
                            city = city[0]['cityName'];
                        }
                        let list = resourcePool.getBarList;
                        return list.request({
                            city:city
                        })
                    }
                }
            })
    });

class IndexController {
    constructor($scope,$ionicSlideBoxDelegate,storedb,$state,barList,application){
        "ngInject"
        this.name = 'index';
        this.barAvatarDemo = imgResource.barAvatarDemo;
        this.state = $state;
        $scope.slideIndex = 0;
        $scope.goSlide = function(index){
            $ionicSlideBoxDelegate.slide(index);
        };
        let city = storedb.key('city').find();
        if(!city){
            this.cityName = '广州';
        }else{
            this.cityName = city[0].cityName;
        }
        this.bars = barList.data.info;
        this.imgHost = application.imgHost;
    }
}


