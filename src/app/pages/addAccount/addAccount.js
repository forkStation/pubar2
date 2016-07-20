import tpl from './addAccount.jade'
import './addAccount.scss'
import { angular, ionic } from 'library'

export default angular.module('addAccount',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('addAccount', {
                url: '/addAccount',
                controllerAs: 'vm',
                controller: AddAccountController,
                template: tpl()
            })
    });


class AddAccountController {
    constructor ($ionicLoading,$ionicPopup,resourcePool) {
        "ngInject"
        this.name = 'addAccount'
        this.form = {
            account:'',
            account_name:''
        }
        this.ionicLoading = $ionicLoading;
        this.popup = $ionicPopup;
        this.resourcePool = resourcePool;
    }

    doAdd(){
        let t = this;
        let $ionicLoading = t.ionicLoading;
        let $popup = t.popup;
        let resourcePool = t.resourcePool;
        if(!t.form.account){
            $ionicLoading.show({
                template:'请输入支付宝账号',
                duration:1000
            });
            return false;
        }

        if(!t.form.account_name){
            $ionicLoading.show({
                template:'请输入账号对应的名称',
                duration:1000
            });
            return false;
        }

        $popup.show({
            title:'警告',
            template:'请仔细核对您的提现账号',
            buttons:[{
                text:'确定',
                onTap:function(){

                    resourcePool.addWalletAccount.request(t.form).then(res=>{
                        if(res.data.status ===1){
                            $ionicLoading.show({
                                template:'添加成功',
                                duration:1000
                            });
                            window.setTimeout(function(){
                                window.history.go(-1);
                            },1000)
                        }else{
                            $ionicLoading.show({
                                template:res.data.info,
                                duration:1000
                            })
                        }
                    })
                }
            },{
                text:'取消'
            }]
        })

    }
}