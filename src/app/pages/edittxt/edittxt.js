import tpl from './edittxt.jade'
import './edittxt.scss'
import { angular, ionic } from 'library'

export default angular.module('edittxt',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('edittxt', {
                url: '/edittxt/:type/:content',
                controllerAs: 'vm',
                controller: EdittxtController,
                template: tpl(),
                resolve:{

                }
            })
    });


class EdittxtController {
    constructor ($stateParams,resourcePool,application,$ionicLoading,$timeout,$state,$interval) {
        "ngInject"
        this.name = 'edittxt';
        let t = this;
        t.params = $stateParams;
        t.form = {
            content:$stateParams.content,
            codeDesc:'获取验证码',
            code:''
        };
        t.resource = resourcePool;
        t.application = application;
        t.loading = $ionicLoading;
        t.timeout = $timeout;
        t.state = $state;
        t.interval = $interval;
        t.sending = true;
        switch (t.params.type){
            case 'nickname':
                t.tips = '请输入昵称';
                break;
            case 'bind':
                t.tips = '请输入手机号码';
                t.resultTip = '请谨慎输入您绑定的手机号码';
                break;
            case 'age':
                t.tips ='请输入您的年龄';
                break;
        }
    }
    SaveInfo(){
        let t = this;
        switch (t.params.type){
            case 'nickname':
                t.resource.userEdit.request({
                    nickname:t.form.content
                }).then(res=>{
                    if(res.data.status==1){
                        t.loading.show({
                            template:'修改成功'
                        });
                        t.timeout(function(){
                            t.loading.hide();
                            window.history.go(-1);
                        },1500)
                    }else{
                        t.loading.show({
                            template:'Error:'+res.data.info,
                            duration:1500
                        });
                    }
                },()=>{
                    t.loading.show({
                        template:'服务器繁忙，请稍后再试',duration:1500
                    })
                });
                break;
            case 'bind':
                if(!/^1\d{10}$/.test(t.form.content)){
                    t.loading.show({
                        template:'请输入正确的11位手机号码',
                        duration:1500
                    });
                    return false;
                }
                t.resource.validSmsCode.request({
                    mobile:t.form.content,
                    code:t.form.code
                }).then(res=>{
                    if(res.data.status ==1){
                        t.resource.userEdit.request({
                            tel:t.form.content
                        }).then(res=>{
                            if(res.data.status == 1){
                                t.loading.show({
                                    template:'手机绑定成功'
                                });
                                t.timeout(function(){
                                    t.loading.hide();
                                    window.history.go(-1);
                                },1500)
                            }else{
                                t.loading.show({
                                    template:res.data.info,
                                    duration:1500
                                });
                            }
                        });
                    }else{
                        t.loading.show({
                            template:res.data.info,
                            duration:1500
                        });
                    }
                });

                break;
            case 'age':
                if(!/^\d+$/.test(t.form.content)){
                    t.loading.show({
                        template:'请输入正确的年龄',
                        duration:1500
                    });
                }else{
                    t.resource.userEdit.request({
                        age:t.form.content
                    }).then(res=>{
                        if(res.data.status == 1){
                            t.loading.show({
                                template:'年龄修改成功'
                            });
                            t.timeout(function(){
                                t.loading.hide();
                                window.history.go(-1);
                            },1500)
                        }else{
                            t.loading.show({
                                template:res.data.info,
                                duration:1500
                            });
                        }
                    });
                }

        }
    }
    sendCode(){
        let _this = this;
        if(_this.sending){
            let sec = 60;
            if(/^1\d{10}$/.test(_this.form.content)){
                _this.sending = false;
                _this.resource.getSmsCode.request({
                    user:_this.form.content
                }).then(res=>{
                    if(res.data.status==1){
                        _this.loading.show({
                            template:'验证码发送成功',
                            duration:1000
                        });

                        _this.form.codeDesc = '重新获取'+sec;
                        let interval = _this.interval(function(){
                            sec--;
                            _this.form.codeDesc = '重新获取'+sec;
                            if(sec==0){
                                _this.form.timeStatus = true;
                                _this.form.codeDesc = '获取验证码';
                                _this.interval.cancel(interval);
                            }
                        },1000)
                    }else{
                        _this.loading.show({
                            template:'系统繁忙,请稍后重试',
                            duration:1000
                        })
                    }
                })
            }else{
                _this.loading.show({
                    template:'请输入正确的11位手机号码',
                    duration:1000
                })
            }
        }
    }
}