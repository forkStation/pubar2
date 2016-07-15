import tpl from './phoneLogin.jade'
import './phoneLogin.scss'
import { angular, ionic } from 'library'

export default angular.module('phoneLogin',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('phoneLogin', {
                url: '/phoneLogin',
                controllerAs: 'vm',
                controller: PhoneLoginController,
                template: tpl()
            })
    });


class PhoneLoginController {
    constructor (application,$interval,resourcePool,$ionicLoading,storedb) {
        "ngInject"
        this.name = 'phoneLogin';
        this.bitmap = application.assets+'bitmap.png';
        this.logo = application.assets+'bar-logo.png';
        this.interval = $interval;
        this.resourcePool = resourcePool;
        this.loading = $ionicLoading;
        this.storedb = storedb;
        this.form = {
            user:'',
            codeDesc:'获取验证码',
            code:'',
            timeStatus:false
        };
        
        /**
         *
         */

    }
    validPhone(){
        let t = this;
        if(!/^1\d{10}$/.test(t.form.user)){
            return false;
        }else{
            return true
        }
    }
    validCode(){
        let t = this;
        if(!/^\d{6}$/.test(t.form.code)){
            return false;
        }else{
            return true;
        }
    }
    getCode(){

        let t = this,sec = 4;
        if(!t.validPhone()){
            t.loading.show({
                template:'请输入正确的手机号码',
                duration:1000
            });
            return false;
        }
        if(t.form.timeStatus){
            return false;
        }else{
            let xhr = t.resourcePool.getSmsCode.request({
                user:t.form.user
            });
            xhr.then(res=>{
                console.log(res);
                if(res.data.status==1){
                    t.loading.show({
                        template:'验证码发送成功',
                        duration:1000
                    });
                    t.form.codeDesc = '重新获取'+sec;
                    t.form.timeStatus = true;
                    let interval = t.interval(function(){
                        sec--;
                        t.form.codeDesc = '重新获取'+sec;
                        if(sec==0){
                            t.form.timeStatus = false;
                            t.form.codeDesc = '获取验证码';
                            t.interval.cancel(interval);
                        }
                    },1000)
                }else{
                    t.loading.show({
                        template:'系统繁忙,请稍后重试',
                        duration:1000
                    })
                }
            },res=>{
                console.log(res);
            });

            console.log(xhr);

        }
    }
    doLogin(){

        let t = this;
        if(!t.validPhone()){
            t.loading.show({
                template:'请输入正确的手机号码',
                duration:1000
            });
            return false;
        }
        if(!t.validCode()){
            t.loading.show({
                template:'请输入验证码',
                duration:1000
            });
            return false;
        }
         t.resourcePool.login.request({
            ftype:1,
            code:t.form.code,
            user:t.form.user
        }).then(res=>{
             if(res.data.status ==1){
                 var localstorage = window.localStorage;
                 if(res.data.info.newuser===1){
                     window.location.replace('/phoneSet');
                     localstorage.removeItem('userInfo');
                     localstorage.setItem('userInfo',JSON.stringify(res.data.info))
                 }else{
                     if(!localstorage.getItem('userInfo')){
                         localstorage.setItem('userInfo',JSON.stringify(res.data.info))
                     }else{
                         localstorage.removeItem('userInfo');
                         localstorage.setItem('userInfo',JSON.stringify(res.data.info))
                     }

                     window.location.replace('/index')
                 }
             }else{
                 t.loading.show({
                     template:res.data.info,
                     duration:1000
                 });
                 return false;
             }
         });


    }
}