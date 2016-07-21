import tpl from './onme.jade'
import './onme.scss'
import { angular, ionic } from 'library'

export default angular.module('onme',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('onme', {
                url: '/onme/:id?barid',
                controllerAs: 'vm',
                controller: OnmeController,
                template: tpl(),
                resolve:{
                    barDetail:function(resourcePool,$stateParams){
                        return resourcePool.getBarInfo.request({
                            'barid':$stateParams.barid
                        })
                    },
                    userInfo:function(resourcePool,$stateParams){
                        return resourcePool.getUserInfo.request({
                            fid:$stateParams.id
                        })
                    }
                }
            })
    });


class OnmeController {
    constructor (application,barDetail,userInfo,resourcePool,$stateParams,$ionicLoading,$timeout,$state) {
        "ngInject"
        this.name = 'onme';
        this.headHost = application.headHost;
        this.imgHost = application.imgHost;
        this.barDetail = barDetail.data.info;
        this.userInfo = userInfo.data.info;
        this.loading = $ionicLoading;
        this.timeout = $timeout;
        this.resource = resourcePool;
        this.state = $state;
        this.application = application;
        this.form = {
            barid:$stateParams.barid,
            invid:$stateParams.id,
            type:0,
            subject:'',
            startTime:''
        }
    }
    doActive(){
        let t = this;

        var dateText = document.getElementById('startTime').value;
        dateText = dateText.replace('T',' ');
        dateText = dateText.replace(/\-/g,'/');
        dateText = dateText.substr(0,dateText.lastIndexOf('.'));
        t.form.startTime = new Date(dateText).getTime();
        t.resource.applyParty.request(t.form).then(res=>{
            if(res.data.status ==1){
                t.application.sendMsg(t.form.invid,7,res.data.info.partyid);
                window.location.replace('/productList/'+t.form.barid+'?partyid='+res.data.info.partyid);
            }else{
                t.loading.show({
                    template:res.data.info,
                    duration:1000
                })
            }
        })
    }
}