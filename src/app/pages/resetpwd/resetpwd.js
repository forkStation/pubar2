import tpl from './resetpwd.jade'
import './resetpwd.scss'
import { angular, ionic } from 'library'

export default angular.module('resetpwd',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('resetpwd', {
                url: '/resetpwd',
                controllerAs: 'vm',
                controller: ResetpwdController,
                template: tpl()
            })
    });


class ResetpwdController {
    constructor ($ionicLoading,$timeout,$interval) {
        "ngInject"
        this.name = 'resetpwd';
        this.loading = $ionicLoading;
        this.timeout = $timeout;
        this.interval = $interval;
        this.flag = true;
        this.buttonText = '获取验证码';
        this.formData = {
            valid:''
        }
    }


    getCode(){
        var _t = this;
        var phoneNumber = _t.formData.valid;
        var _sec = 60;
        if(!_t.flag) return false;
        if(!phoneNumber){
            _t.loading.show({
                template:'请输入验证码'
            });

        }else{
            _t.flag = false;
            _t.buttonText = _sec+'重新获取';
            var interval =_t.interval(function(){
                _sec -- ;
                _t.buttonText = _sec+'重新获取';
                if(_sec == 0){
                    _t.flag = true;
                    _t.buttonText = '获取验证码';
                    _t.interval.cancel(interval);
                }
            },1000)
        }
        _t.timeout(function(){
            _t.loading.hide();
        },1000)
    }
}