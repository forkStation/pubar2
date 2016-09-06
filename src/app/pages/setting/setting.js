import tpl from './setting.jade'
import './setting.scss'
import { angular, ionic } from 'library'

export default angular.module('setting',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('setting', {
                url: '/setting',
                controllerAs: 'vm',
                controller: SettingController,
                template: tpl(),
                resolve:{
                    getUserInfo:function (resourcePool) {
                        return resourcePool.getUserInfo.request({

                        })
                    }
                }
            })
    });


class SettingController {
    constructor ($ionicActionSheet,getUserInfo) {
        "ngInject"
        this.name = 'setting';
        this.actionSheet = $ionicActionSheet;
        this.userInfo = getUserInfo.data.info;
        this.isSetPay = this.userInfo.hpd;
    }
    clearCache(){

        let $actionSheet = this.actionSheet;
        $actionSheet.show({
            destructiveText: '确定',
            titleText: '删除应用缓存记录吗?',
            cancelText: '取消',
            destructiveButtonClicked:function(){
                window.localStorage.removeItem('userInfo');
                window.localStorage.removeItem('city');
                window.location.replace('/index')
            }
        });

    }
    quit(){
         let $actionSheet = this.actionSheet;
        $actionSheet.show({
            destructiveText: '确定',
            titleText: '确定退出账号吗?',
            cancelText: '取消',
            destructiveButtonClicked:function(){
                window.localStorage.removeItem('userInfo');
                window.location.replace('/index')
            }
        });
    }
}