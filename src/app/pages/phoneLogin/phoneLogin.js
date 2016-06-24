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
    constructor (application,$interval,resourcePool,$ionicLoading) {
        "ngInject"
        this.name = 'phoneLogin';
        this.bitmap = application.assets+'bitmap.png';
        this.logo = application.assets+'bar-logo.png';
        this.interval = $interval;
        this.resourcePool = resourcePool;
        this.loading = $ionicLoading;
        this.form = {
            user:'',
            codeDesc:'获取验证码',
            timeStatus:false
        };
        /**
         *
         */

    }
    getCode(){

        let t = this,sec = 4;
        if(!/^1\d{10}$/.test(t.form.user)){
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
                if(res.data.info.status==1){
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
                    console.log('err')
                }
            },res=>{
                console.log(res);
            });

            console.log(xhr);

        }
    }
}