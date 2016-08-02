import tpl from './onme_detail.jade'
import './onme_detail.scss'
import { angular, ionic } from 'library'

export default angular.module('onme_detail',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('onme_detail', {
                url: '/onme_detail/:partyid',
                controllerAs: 'vm',
                controller: Onme_detailController,
                template: tpl(),
                resolve:{
                    getPartyInfo:function(resourcePool,$stateParams){
                        return resourcePool.getPartyInfo.request({
                            partyid:$stateParams.partyid
                        })
                    }
                }
            })
    });


class Onme_detailController {
    constructor (application,getPartyInfo,resourcePool,$stateParams,$ionicLoading,$state) {
        "ngInject"
        this.name = 'onme_detail';
        this.headHost = application.headHost;
        this.partyInfo = getPartyInfo.data.info;
        this.imgHost = application.imgHost;
        this.partyId = $stateParams.partyid;
        this.resourcePool = resourcePool;
        this.loading = $ionicLoading;
        this.state = $state;
        let t = this;
        resourcePool.getBarInfo.request({
            barid:t.partyInfo.party.barID
        }).then(res=>{
            t.barInfo = res.data.info;
        });
        this.application = application;
    }
    doJoin(){
        let t = this;
        let partyid = t.partyId;
        this.resourcePool.agreeParty.request({
            partyid:partyid
        }).then(res=>{
            if(res.data.status ==1){

                t.application.info('提示',res.data.info,function(){
                    window.history.go(-1)
                });
                t.application.sendMsg(t.partyInfo.user.id,3,partyid,0);

            }else{
                t.loading.show({
                    template:res.data.info,
                    duration:1000
                })
            }
        })
    }
    doReject(){
        let t = this;
        let partyid = t.partyId;
        this.resourcePool.rejectParty.request({
            partyid:partyid
        }).then(res=>{
            if(res.data.status ==1){

                t.application.info('提示',res.data.info,function(){
                    window.history.go(-1)
                });
                t.application.sendMsg(t.partyInfo.user.id,9,partyid,0);

            }else{
                t.loading.show({
                    template:res.data.info,
                    duration:1000
                })
            }
        })
    }
    chat(id){
        this.state.go('chat',{id})
    }
}