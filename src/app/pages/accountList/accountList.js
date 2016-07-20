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
        this.payWay = 1;
        this.list = getAccountList.data.info;
        this.resourcePool = resourcePool;
        this.loading = $ionicLoading;
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
                    duration:1000
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