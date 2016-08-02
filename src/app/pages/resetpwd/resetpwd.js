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
    constructor ($ionicLoading,$timeout,$interval,$ionicPopup,$ionicHistory) {
        "ngInject"
        this.name = 'resetpwd';
        this.loading = $ionicLoading;
        this.timeout = $timeout;
        this.interval = $interval;
        this.loc = $ionicHistory;
        this.flag = true;
        this.buttonText = '获取验证码';
        this.popup = $ionicPopup;
        this.formData = {
            valid:''
        };

        this.initPwd = [];
        this.codeState = true;

    }

    nextStep(){
        this.codeState = false;
    }

    getCode(){
        var _t = this;
        var phoneNumber = _t.formData.valid;
        var _sec = 60;
        if(!_t.flag) return false;
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
        },1000);
        _t.timeout(function(){
            _t.loading.hide();
        },1000)
    }

    setNum(num){
        var _t = this,_pwd = _t.initPwd;
        if(_pwd.length>=6)return false;
        _pwd.push(num);
        console.log(_pwd);
    }
    delNum(){
        var _t = this,_pwd = _t.initPwd;
        _pwd.pop();
        console.log(_pwd);
    }
    resetPwd(){
        this.popup.show({
            title:'xx',
            template:'xx',
            buttons:[{
                text:'确定',
                onTap:function(){

                }
            }]
        })
    }
    back(){
        window.history.go(-1);
    }
}