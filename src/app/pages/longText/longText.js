import tpl from './longText.jade'
import './longText.scss'
import { angular, ionic } from 'library'

export default angular.module('longText',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('longText', {
                url: '/longText/:type/:content',
                controllerAs: 'vm',
                controller: LongTextController,
                template: tpl()
            })
    });


class LongTextController {
    constructor ($stateParams,resourcePool,application,$ionicLoading,$timeout,$state) {
        "ngInject"
        this.name = 'longText';
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
            case 'sign':
                t.tips = '请输入修改的签名';
                break;
            case 'hobby':
                t.tips = '请输入你的爱好,多个可用","号隔开';
                break;
        }

    }
    SaveInfo(){
        let t = this;
        switch (t.params.type){
            case 'sign':
                t.resource.userEdit.request({
                    sign:t.form.content
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
            case 'hobby':
                t.resource.userEdit.request({
                    hobby:t.form.content
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
        }
    }
}

