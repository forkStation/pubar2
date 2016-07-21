import tpl from './accountList.jade'
import './accountList.scss'
import { angular, ionic } from 'library'

export default angular.module('accountList',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('accountList', {
                url: '/accountList',
                controllerAs: 'vm',
                controller: AccountListController,
                template: tpl(),
                resolve:{
                    getAccountList:function(resourcePool){
                        return resourcePool.getAccountList.request({

                        })
                    }
                }
            })
    });


class AccountListController {
    constructor (getAccountList,resourcePool,$ionicLoading) {
        "ngInject"
        this.name = 'accountList';

        this.list = getAccountList.data.info;

        this.resourcePool = resourcePool;
        this.loading = $ionicLoading;
        let t = this;

        for(var i = 0;i<t.list.length;i++){
            if(t.list[i]['isDefault']==1){
                t.payWay = t.list[i]['id'];
            }
        }
    }
    changePay(id){
        this.payWay = id;
        let t = this;
        this.resourcePool.setDefaultAccount.request({
            id:id
        }).then(res=>{
            if(res.data.status ===1){
                t.loading.show({
                    template:'修改成功',
                    duration:500
                })
            }else{
                t.loading.show({
                    template:res.data.info,
                    duration:1000
                })
            }
        })
    }
}