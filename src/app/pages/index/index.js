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
                    barList:function(resourcePool,storedb,login){
                        var city = storedb.key('city').find();
                        if(!city){
                            city = '广州';
                        }else{
                            city = city[0]['cityName'];
                        }
                        return resourcePool.getBarList.request({
                            city:city
                        })
                    },
                    partyList:function(resourcePool,login){
                        return resourcePool.getPartyList.request({});
                    }
                }
            })
    });

class IndexController {
    constructor($scope,$ionicSlideBoxDelegate,storedb,$state,barList,application,partyList,$ionicScrollDelegate){
        "ngInject"
        this.name = 'index';
        this.barAvatarDemo = imgResource.barAvatarDemo;
        this.state = $state;
        $scope.slideIndex = 0;
        $scope.goSlide = function(index){
            $ionicSlideBoxDelegate.slide(index);
            $ionicScrollDelegate.$getByHandle('mainScroll').resize();
        };

        let city = storedb.key('city').find();
        if(!city){
            this.cityName = '广州';
        }else{
            this.cityName = city[0].cityName;
        }
        this.bars = barList.data.info;
        this.imgHost = application.imgHost;
        this.partyList = partyList.data.info;

        console.log(this.partyList);
    }
    goGroupDetail(id){
        let t = this;
        t.state.go('groupDetail',{id:id});
    }

}


