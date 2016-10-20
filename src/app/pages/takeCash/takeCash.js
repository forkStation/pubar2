import tpl from './takeCash.jade'
import './takeCash.scss'
import { angular, ionic } from 'library'

export default angular.module('takeCash',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('takeCash', {
                url: '/takeCash',
                controllerAs: 'vm',
                controller: TakeCashController,
                template: tpl(),
                resolve:{
                    getDrawInfo:function(resourcePool){
                        return resourcePool.getDrawInfo.request({})
                    }
                }
            })
    });


class TakeCashController {
    constructor (getDrawInfo,resourcePool,application,$ionicLoading) {
        "ngInject"
        this.name = 'takeCash';
        this.info = getDrawInfo.data.info;
        this.takeAccount = this.info.auser.account;
        this.resourcePool = resourcePool;
        this.application = application;
        this.money = '';
        this.loading = $ionicLoading;
    }
    takeMoney(){
        
        let _this = this;
        if(!/^\d{1,9}$|^\d{1,9}[.]\d{1,3}$/.test(this.money)){
            _this.loading.show({
                template:'请输入正确的金额',
                duration:1500
            })
            return false;
        }
        this.resourcePool.getWithdrawMoney.request({
            id:_this.info.auser.id,
            money:_this.money
        }).then(res=>{
            if(res.data.status == 1){
                _this.application.info('提示','申请提现成功，将在1-3个工作日内到账',()=>{
                    window.history.go(-1);
                })
             
            }else{
                 _this.loading.show({
                    template:res.data.info,
                    duration:1500
                })
            }
        });
    }
}