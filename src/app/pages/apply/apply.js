import tpl from './apply.jade'
import './apply.scss'
import { angular, ionic } from 'library'

export default angular.module('apply',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('apply', {
                url: '/apply/:partyid/:fid',
                controllerAs: 'vm',
                controller: ApplyController,
                template: tpl(),
                resolve:{
                    getPartyInfo:function(resourcePool,$stateParams){
                        return resourcePool.getPartyInfo.request({
                            partyid:$stateParams.partyid
                        })
                    },
                    getUserInfo:function(resourcePool,$stateParams){
                        return resourcePool.getUserInfo.request({
                            fid:$stateParams.fid
                        })
                    }
                }
            })
    });


class ApplyController {
    constructor ($ionicActionSheet,getPartyInfo,getUserInfo,application,resourcePool,$ionicLoading,$stateParams) {
        "ngInject"
        this.name = 'apply';
        this.headHost = application.headHost;
        this.imgHost = application.imgHost;
        this.actionSheet = $ionicActionSheet;
        this.partyInfo = getPartyInfo.data.info;
        this.userInfo = getUserInfo.data.info;
        this.resourcePool = resourcePool;
        this.loading = $ionicLoading;
        let t = this;
        this.partyid = this.partyInfo.party.id;
        this.currentCount = ~~this.partyInfo.party.boyCount + ~~this.partyInfo.party.girlCount;
        this.fid = $stateParams.fid;
        resourcePool.getBarInfo.request({
            barid : t.partyInfo.party.barID
        }).then(res=>{
            if(res.data.status ==1){
                t.barInfo = res.data.info;
            }
        })
    }

    resolve(){
        let _this = this;
        _this.resourcePool.agreeUserJoin.request({
            partyid:_this.partyid,
            fid : _this.fid
        }).then(res=>{
            if(res.data.status ==1) {
                _this.loading.show({
                    template:res.data.info,
                    duration:1500
                });
                _this.application.sendMsg(_this.fid,3,_this.partyid);
                window.setTimeout(function () {
                    window.history.go(-1);
                },1500)
            }else{
                _this.loading.show({
                    template:res.data.info,
                    duration:1000
                })
            }

        })
    }
    blacklist(){
        let t = this;
        t.actionSheet.show({
            destructiveText: '确定',
            titleText: '加入黑名单后对方将无法继续申请',
            cancelText: '取消',
            destructiveButtonClicked:function(){
                // coding goes here
                return true;
            }
        });
    }
    reject(){
        let _this = this;
        _this.actionSheet.show({
            destructiveText: '确定',
            titleText: '拒绝对方加入酒局吗?',
            cancelText: '取消',
            destructiveButtonClicked:function(){
                _this.resourcePool.rejectUserJoin.request({
                    partyid:_this.partyid,
                    fid : _this.fid
                }).then(res=>{
                    if(res.data.status ==1) {
                        _this.loading.show({
                            template:'已拒绝',
                            duration:1500
                        });
                        _this.application.sendMsg(_this.fid,4,_this.partyid);
                        window.setTimeout(function () {
                            window.history.go(-1);
                        },1500)
                    }
                });
                return true;
            }
        });
    }
}