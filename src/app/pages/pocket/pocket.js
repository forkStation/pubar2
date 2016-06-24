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
                    walletInfo:function(resourcePool,application){
                        return resourcePool.getWalletInfo.request({
                            userid:application.userId
                        })
                    },
                    walletList:function(resourcePool,application){
                        return resourcePool.getWalletList.request({
                            userid:application.userId
                        })
                    }
                }
            })
    });


class PocketController {
    constructor (walletInfo,walletList) {
        "ngInject"
        this.name = 'pocket';

        if(walletInfo.data.status ==1){
            this.walletInfo = walletInfo.data.info;
        }
        if(walletList.data.status ==1){
            this.walletList = walletList.data.info;
        }

        console.log(walletInfo);
    }
}