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
                template: tpl(),
                resolve:{
                    getCity:function(resourcePool){
                        let cities = resourcePool.getCities;
                        return cities.request({})
                    }
                }
            })
    });


class LocationController {
    constructor (getCity,storedb,$ionicPopup,$ionicViewSwitcher,$ionicLoading) {
        "ngInject"
        this.name = 'location';
        this.cities = getCity.data.info;
        this.popup = $ionicPopup;
        this.storeDB = storedb;
        this.initCity = '广州';
        let t = this;
        t.viewSwitcher = $ionicViewSwitcher;
        t.loading = $ionicLoading;
        let currentCity = storedb.key('city').find();
        if(!currentCity){
            storedb.key('city').insert({'cityName':t.initCity});
        }else{
            t.initCity = currentCity[0]['cityName'];
        }
    }
    changeCity(city){
        let t = this;
        t.popup.show({
            title:'温馨提示',
            template:'是否将当前城市修改为'+city,
            buttons:[{
                text:'确定',
                onTap:function(){
                    let curName = t.storeDB.key('city').find()[0]['cityName'];
                    t.initCity = city;
                    t.storeDB.key('city').update({'cityName':curName},{'$set':{'cityName':city}},function (err, result) {
                        if(!err){
                            history.go(-1);
                        }
                    });

                    return true;
                }
            },{
                text:'取消'
            }]
        })
    }
    goBack(){
        let t = this;
        t.viewSwitcher.nextDirection('back');
    }
}