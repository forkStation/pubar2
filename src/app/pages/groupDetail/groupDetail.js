import tpl from './groupDetail.jade'
import './groupDetail.scss'
import { angular, ionic } from 'library'

export default angular.module('groupDetail',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('groupDetail', {
                url: '/groupDetail/:id',
                controllerAs: 'vm',
                controller: GroupDetailController,
                template: tpl(),
                resolve:{
                    detail:function(resourcePool,$stateParams){
                        return resourcePool.getPartyInfo.request({
                            partyid:$stateParams.id
                        })
                    },
                    users:function(resourcePool,$stateParams){
                        return resourcePool.getPartyUser.request({
                            partyid:$stateParams.id
                        })
                    },
                    getUserInfo:function(resourcePool,$stateParams){
                        return resourcePool.getUserInfo.request({

                        })
                    }
                }
            })
    });


class GroupDetailController {
    constructor ($state,detail,application,resourcePool,$ionicPopup,$ionicLoading,users,$scope,socket,$stateParams,getUserInfo,$location) {
        "ngInject"
        this.name = 'groupDetail';
        this.state = $state;
        this.popup = $ionicPopup;
        this.loading = $ionicLoading;
        this.resourcePool = resourcePool;
        this.getUsers = users.data.info;
        this.scope = $scope;
        var _this = this;
        _this.flag = false;
        

        _this.userInfo = getUserInfo.data.info;

        //open socket of groupDetail

        socket.emit('party',$stateParams.id,_this.userInfo.id)

       resourcePool.getMsgRecord.request({
            partyid: $stateParams.id,
            type: 2
        }).then((res) => {
            if (res.data.status == 1) {
                _this.chatsMsg = res.data.info || [];
                if (res.data.info) {
                    console.log(res.data.info)
                    for (let i = 0; i < res.data.info.length; i++) {
                        _this.chatsMsg[i]['avatar'] = res.data.info[i]['sinfo']['headIcon'];
                        _this.chatsMsg[i]['nickname'] = res.data.info[i]['sinfo']['nickname'];
                    }
                }
            }
        })
        application.openWxShare('wechat',{
            title:_this.userInfo.nickname+'分享了一个酒局给你',
            content:'我在蒲吧网发现了一个很有趣的酒局，跟我一起加入吧',
            link:$location.absUrl(),
            img:application.assets+'bar-logo.png'
        })

        this.showComment = function(){
            _this.flag = true;
        };
        this.detail = detail.data.info;

        this.imgHost = application.imgHost;
        this.headHost = application.headHost;
        this.application = application;

        let xhr = resourcePool.getBarInfo.request({
            barid:_this.detail.party.barID
        });
        xhr.then(res=>{
            _this.barInfo = res.data.info;
            _this.barAddress = res.data.info.address;
        },res=>{
            // error
        });
    
    }
    goChat(id){
        this.state.go('chat',{id:id})
    }
    joinParty(item){
        let t = this;
        var barid = t.detail.party.barID;
        var fid = t.detail.user.id;
        t.popup.show({
            template:'确定加入该酒局吗?',
            title:'提示信息',
            buttons:[{
                text:'确定',
                onTap:function(){
                    t.resourcePool.joinParty.request({
                        barid:barid,
                        partyid:item.id
                    }).then(res=>{
                        if(res.data.status ==1 ){


                            /**
                             * 直接参加成功,不需要审核也不需要付款
                             */
                            if(res.data.info.topay == 0){
                                t.application.sendMsg(fid,10,item.id);
                                t.application.info('温馨提示','您已成功加入该酒局,请准时参加哦');


                            }
                            /**
                             * 如果不需要审核,并且是需要支付的
                             */
                            if(res.data.info.topay == 1){
                                location.href='/toPay/orderPay?orderid=0&genre=1&partyid='+t.detail.party.id;

                            }
                            /**
                             *  需要创建者审核的
                             */
                            if(res.data.info.topay == 2){
                               t.application.sendMsg(fid,2,item.id);
                                t.application.info('温馨提示','你已申请加入对方酒局,请等待对方审核');
                           }
                        }else{
                            t.loading.show({
                                template:res.data.info,
                                duration:1000
                            })
                        }
                    })
                }
            },{text:'取消'}]
        })
    }
    goPay(party){
        location.href='/toPay/orderPay?orderid=0&genre=1&partyid='+party.id;
    }


}