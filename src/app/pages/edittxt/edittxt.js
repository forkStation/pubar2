import tpl from './edittxt.jade'
import './edittxt.scss'
import { angular, ionic } from 'library'

export default angular.module('edittxt',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('edittxt', {
                url: '/edittxt/:type',
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
        t.form = {};
        t.resource = resourcePool;
        t.application = application;
        t.loading = $ionicLoading;
        t.timeout = $timeout;
        t.state = $state;
        switch (t.params.type){
            case 'nickname':
                t.tips = '请输入昵称';
                t.form.content='';
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
                            t.state.go('member_edit')
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

        }
    }
}