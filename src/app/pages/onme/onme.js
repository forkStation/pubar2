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

                    userInfo:function(resourcePool,$stateParams){
                        return resourcePool.getUserInfo.request({
                            fid:$stateParams.id
                        })
                    },
                    getMineInfo:function (resourcePool) {
                        return resourcePool.getUserInfo.request({})
                    }
                }
            })
    });


class OnmeController {
    constructor (application,userInfo,resourcePool,$stateParams,$ionicLoading,$timeout,$state,getMineInfo) {
        "ngInject"
        this.name = 'onme';
        this.headHost = application.headHost;
        this.imgHost = application.imgHost;
        this.userInfo = userInfo.data.info;
        this.loading = $ionicLoading;
        this.timeout = $timeout;
        this.resource = resourcePool;
        this.state = $state;
        this.application = application;
        this.stateParams = $stateParams;
        let _this = this;
        this.barid = $stateParams.barid;
        if(this.barid){
            resourcePool.getBarInfo.request({
                barid:_this.barid
            }).then(res=>{
                _this.barDetail = res.data.info;
                _this.cover = _this.imgHost + _this.barDetail.cover;
            })
        }else{
            _this.cover = _this.headHost + (_this.userInfo.bgpic || 'defaultMemberBackground.png');
        }
        _this.creatorBars = [{
            barid:0,
            name:'请选择酒吧'
        }];
        _this.creatorBars = _this.creatorBars.concat(getMineInfo.data.info.mybar);



        console.log(_this.creatorBars)
        _this.defaultSelected = _this.creatorBars[0];
        this.form = {
            barid:_this.barid || _this.defaultSelected.barid,
            invid:$stateParams.id,
            type:0,
            subject:'',
            startTime:''
        }
    }
    doActive(){
        let t = this;



        let barid = ! t.stateParams.barid ? t.defaultSelected.barid : t.stateParams.barid;


        t.form.barid = barid;



        if(!t.form.barid || t.form.barid === 0){
            t.loading.show({
                template:'请选择酒吧',
                duration:1000
            });
            return false;
        }
        t.resource.applyParty.request(t.form).then(res=>{
            if(res.data.status ==1){
                t.application.sendMsg(t.form.invid,7,res.data.info.partyid);
                window.location.replace('/productList/'+barid+'?partyid='+res.data.info.partyid);
            }else{
                t.loading.show({
                    template:res.data.info,
                    duration:1000
                })
            }
        })
    }

}