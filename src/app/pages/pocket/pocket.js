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
                    walletList:function(resourcePool){
                        return resourcePool.getWalletList.request({
                        })
                    }
                }
            })
    });


class PocketController {
    constructor (walletInfo,walletList) {
        "ngInject"
        this.name = 'pocket';

        this.walletInfo = walletInfo.data.info.wallet;
        this.walletList = walletList.data.info.record;


    }
}