import tpl from './pocket.jade'
import './pocket.scss'
import { angular, ionic } from 'library'

export default angular.module('pocket',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('pocket', {
                url: '/pocket',
                controllerAs: 'vm',
                controller: PocketController,
                template: tpl(),
                resolve:{
                    walletInfo:function(resourcePool){
                        return resourcePool.getWalletInfo.request({
                        })
                    },
                    walletRecord:function(resourcePool){
                        return resourcePool.getWalletRecord.request({

                        })
                    }
                }
            })
    });

class PocketController {
    constructor (walletInfo,walletRecord) {
        "ngInject"
        this.name = 'pocket';

        this.walletInfo = walletInfo.data.info.wallet;
        /**
         * 1：支付记录    2：退款记录     3：充值记录      4：提现记录
         */
        this.walletList = walletRecord.data.info;

        let t = this;
        for(var i = 0;i<this.walletList.length;i++){
            if(t.walletList[i]['rtype']==1){
                t.walletList[i]['rdesc'] = '酒局支付'
            }
              if(t.walletList[i]['rtype']==2){
                t.walletList[i]['rdesc'] = '退款'
            }
              if(t.walletList[i]['rtype']==3){
                t.walletList[i]['rdesc'] = '充值'
            }
              if(t.walletList[i]['rtype']==4){
                t.walletList[i]['rdesc'] = '提现'
            }
        }

        
    }
}