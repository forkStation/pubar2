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
                template: tpl(),
                resolve:{
                    getUserInfo:function (resourcePool) {
                        return resourcePool.getUserInfo.request({})
                    }
                }
            })
    });


class ResetpwdController {
    constructor ($ionicLoading,$timeout,$interval,$ionicPopup,$ionicHistory,getUserInfo,resourcePool,application) {
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
        this.resourcePool = resourcePool;
        this.userInfo = getUserInfo.data.info;
        this.telephone = this.userInfo.tel.substr(0,3)+'****'+this.userInfo.tel.substr(8,11);
        this.initPwd = [];
        this.codeState = true;
        this.application = application;
        this.resetKey = '';
        this.resetMobile = '';

    }



    getCode(){
        var _t = this;

        var _sec = 60;
        if(!_t.flag) return false;
        _t.flag = false;

        _t.buttonText = _sec+'重新获取';
        _t.loading.show({
            template:'验证码已发送',
            duration:1000
        })
        _t.resourcePool.getSmsCode.request({
            user:_t.userInfo.tel
        }).then(res=>{
            if(res.data.status ==1){

                var interval =_t.interval(function(){
                    _sec -- ;
                    _t.buttonText = _sec+'重新获取';
                    if(_sec == 0){
                        _t.flag = true;
                        _t.buttonText = '获取验证码';
                        _t.interval.cancel(interval);
                    }
                },1000);

            }

        });

    }
    nextStep(){
        var _t = this;
        var validCode = _t.formData.valid;
        if(!validCode) {
            _t.loading.show({
                template:'请输入正确的验证码'
            })
        }else{
            _t.resourcePool.validSmsCode.request({
                code:validCode,
                mobile:_t.userInfo.tel
            }).then(res=>{
                if(res.data.status ==1){
                    _t.codeState = false;
                    _t.resetKey = res.data.info.key;
                    _t.resetMobile = res.data.info.mobile;
                }else{
                    _t.loading.show({
                        template:res.data.info,
                        duration:1000
                    })
                }
            })
        }
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
        let _t = this;
        this.resourcePool.updatePayPwd.request({
            paypwd:_t.initPwd.join(''),
            key:_t.resetKey,
            mobile:_t.resetMobile
        }).then(res=>{
            if(res.data.status ==1){
                _t.application.info('微信提示','支付密码已重置',function () {
                    window.history.go(-1)
                })
            }else{
                _t.loading.show({
                    template:res.data.info,
                    duration:1000
                })
            }
        })
    }
    back(){
        window.history.go(-1);
    }
}