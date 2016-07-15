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
    constructor ($stateParams,resourcePool,application,$ionicLoading,$timeout,$state) {
        "ngInject"
        this.name = 'edittxt';
        let t = this;
        t.params = $stateParams;
        t.form = {
            content:$stateParams.content
        };
        t.resource = resourcePool;
        t.application = application;
        t.loading = $ionicLoading;
        t.timeout = $timeout;
        t.state = $state;
        switch (t.params.type){
            case 'nickname':
                t.tips = '请输入昵称';
                break;
            case 'bind':
                t.tips = '请输入手机号码';
                t.resultTip = '请谨慎输入您绑定的手机号码';
                break;
        }
    }
    SaveInfo(){
        let t = this;
        switch (t.params.type){
            case 'nickname':
                t.resource.userEdit.request({
                    userid:t.application.userId,
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
                t.resource.wxBind.request({
                    user:t.form.content,
                    openid:JSON.parse(window.localStorage.getItem('userInfo')).openid
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
                break;

        }
    }
}