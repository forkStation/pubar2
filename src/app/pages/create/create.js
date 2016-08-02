import tpl from './create.jade'
import './create.scss'
import { angular, ionic } from 'library'
export default angular.module('create',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('create', {
                url: '/create/:barid',
                controllerAs: 'vm',
                controller: CreateController,
                template: tpl(),
                resolve:{
                    barDetail:function(resourcePool,$stateParams){
                        return resourcePool.getBarInfo.request({
                            'barid':$stateParams.barid
                        })
                    },
                    createUserInfo:function(resourcePool){
                        return resourcePool.getUserInfo.request({

                        })
                    }
                }
            })
    });


class CreateController {
    constructor ($stateParams,resourcePool,$ionicLoading,application,$state,$ionicPopup,$scope,barDetail,createUserInfo) {
        "ngInject"
        this.name = 'create';

        this.barDetail = barDetail.data.info;
        this.imgHost = application.imgHost;
        this.headHost = application.headHost;
        this.createUserInfo = createUserInfo.data.info;
        let t = this;
        t.params = $stateParams;
        t.resource = resourcePool;
        t.loading = $ionicLoading;
        t.scope = $scope;
        t.state = $state;
        t.popup = $ionicPopup;
        t.borg = [
            {id:0, text:'半男半女'},
            {id:1,text:'只限女性'},
            {id:2,text:'只限男性'},
            {id:3,text:'无限制'}

        ];
        t.type=[
            {id:0,text:'本大爷请客'},
            {id:3,text:'AA'},
            {id:1,text:'男A女免'}
        ];
        t.audit = [
            {id:0,text:'无需审核'},
            {id:1,text:'需要我的审核'}
        ];
        t.borgValue = {id:0, text:'无限制'};
        t.typeValue = {id:0,text:'本大爷请客'};
        t.auditValue = {id:0,text:'无需审核'};
        console.log(t.auditValue);
        t.form = {
            subject:'',
            startTime:0,
            num:10,
            borg:0,
            type:0,
            audit:0,
            barid:$stateParams.barid
        }
    }
    submitParty(){
        let t = this;
        var $popup = t.popup;
        t.form.borg = t.borgValue.id;
        t.form.type = t.typeValue.id;
        t.form.audit = t.auditValue.id;
        let $state = t.state;
        let $scope = t.scope;
        if(!t.form.subject){
            t.loading.show({
                template:'酒局主题不能为空',
                duration:1000
            });
            return false;
        }
        if(!t.form.num){
            t.loading.show({
                template:'请输入限制人数',
                duration:1000
            });
            return false;
        }

        t.resource.createParty.request(t.form).then(res=>{

            $scope.form = {
                user:''
            };
            
            if(res.data.status === 1){
                t.loading.show({
                    template:'酒局创建成功',
                    duration:1500
                });

                window.location.href='/productList/'+t.params.barid+'?partyid='+res.data.info.partyid;


            }else if(res.data.status == '0007'){
                $popup.show({
                    title:'提示',
                    template:'<div>您当前没有绑定手机无法创建酒局,是否立即绑定?</div>',
                    buttons:[{
                        text:'确定',
                        onTap:function(){
                            location.href = '/edittxt/bind/'
                        }
                    },{
                        text:'取消'
                    }],
                    scope:$scope
                })
            }else{
                t.loading.show({
                    template:res.data.info,
                    duration:1500
                });
            }
        })
    }
}