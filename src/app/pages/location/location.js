import tpl from './location.jade'
import './location.scss'
import { angular, ionic } from 'library'
export default angular.module('location',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('location', {
                url: '/location',
                controllerAs: 'vm',
                controller: LocationController,
                template: tpl()
            })
    });


class LocationController {
    constructor ($ionicPopup,$ionicViewSwitcher,$ionicLoading,$location,$state,resourcePool,$anchorScroll) {
        "ngInject"
        this.name = 'location';
        this.popup = $ionicPopup;
        this.initCity = '广州';
        this.location = $location;
        let t = this;
        t.viewSwitcher = $ionicViewSwitcher;
        t.loading = $ionicLoading;
        this.anchorScroll = $anchorScroll;

        this.storage = window.localStorage;
        let currentCity = this.storage.getItem('city');
        this.state = $state;
        this.resourcePool = resourcePool;
        if(!currentCity){
            t.storage.setItem('city','广州')
        }else{
            t.initCity = t.storage.getItem('city');
        }
        this.loadCity()
    }
    loadCity(cityName){
        let _this = this;
        _this.resourcePool.getCities.request({
            word:cityName || ''
        }).then(res=>{
            _this.cities = res.data.info
        })
    }
    changeCity(city){
        let t = this;
        t.popup.show({
            title:'温馨提示',
            template:'是否将当前城市修改为'+city,
            buttons:[{
                text:'确定',
                onTap:function(){
                    t.initCity = city;
                    t.storage.setItem('city',city);
                    window.location.replace('/index')
                    return true;
                }
            },{
                text:'取消'
            }]
        })
    }
    goBack(){
        this.state.go('index');
    }
    goIndex(index){
        let upperCase = angular.uppercase(index);
        let $location = this.location;
        $location.hash(upperCase);
        this.anchorScroll();
    }
}