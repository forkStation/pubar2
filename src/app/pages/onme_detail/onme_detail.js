import tpl from './onme_detail.jade'
import './onme_detail.scss'
import { angular, ionic } from 'library'

export default angular.module('onme_detail',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('onme_detail', {
                url: '/onme_detail/:partyid',
                controllerAs: 'vm',
                controller: Onme_detailController,
                template: tpl(),
                resolve:{
                    getPartyInfo:function(resourcePool,$stateParams){
                        return resourcePool.getPartyInfo.request({
                            partyid:$stateParams.partyid
                        })
                    }
                }
            })
    });


class Onme_detailController {
    constructor (application,getPartyInfo,resourcePool) {
        "ngInject"
        this.name = 'onme_detail';
        this.headHost = application.headHost;
        this.partyInfo = getPartyInfo.data.info;
        this.imgHost = application.imgHost;
        let t = this;
        resourcePool.getBarInfo.request({
            barid:t.partyInfo.party.barid
        }).then(res=>{
            t.barInfo = res.data.info;
        })
    }
}