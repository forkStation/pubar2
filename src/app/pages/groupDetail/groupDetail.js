import tpl from './groupDetail.jade'
import './groupDetail.scss'
import { angular, ionic } from 'library'
import imgResource from 'assets/images'

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
                    getBarInfo:function(resourcePool,$stateParams){
                        return resourcePool.getBarInfo.request({
                            id:$stateParams.id
                        })
                    }
                }
            })
    });


class GroupDetailController {
    constructor ($state,detail,application,resourcePool,$ionicPopup,$ionicLoading,users,$scope) {
        "ngInject"
        this.name = 'groupDetail';
        this.state = $state;
        this.popup = $ionicPopup;
        this.loading = $ionicLoading;
        this.resourcePool = resourcePool;
        this.getUsers = users.data.info;
        console.log(this.getUsers);
        this.scope = $scope;
        var _this = this;
        _this.flag = false;
        this.productItem = imgResource.productItem;
        this.barAvatarDemo = imgResource.barAvatarDemo;

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
            _this.barAddress = res.data.info.address;
        },res=>{
            // error
        });
        this.chatsMsg = [{
            id:'1',
            msg:'你好',
            avatar:this.productItem,
            user_id:'1124',
            nickname:'李锋染'
        },{
            id:'1',
            msg:'你好啊',
            avatar:this.productItem,
            user_id:'00',
            nickname:'Anna Sui'
        },{
            id:'1',
            msg:'怎么称呼,美女?',
            avatar:this.productItem,
            user_id:'1124',
            nickname:'李锋染'
        },{
            id:'1',
            msg:'Anna',
            avatar:this.productItem,
            user_id:'00',
            nickname:'Anna sui'
        },{
            id:'1',
            msg:'Anna你好',
            avatar:this.productItem,
            user_id:'1124',
            nickname:'李锋染'
        }];

        this.msgInfo = {
            user_id:'00',
            nickname:'Anna sui',
            msg:'',
            avatar:this.productItem,
            id:'sdf'
        };
    }
    goChat(){
        this.state.go('chat')
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
                                location.href='/createOrder?orderid=0&genre=1&partyid='+t.detail.party.id;

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


}