import tpl from './successInfo.jade'
import './successInfo.scss'
import { angular, ionic } from 'library'

export default angular.module('successInfo',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('successInfo', {
                url: '/successInfo/:orderid/:genre?partyid',
                controllerAs: 'vm',
                controller: SuccessInfoController,
                template: tpl(),
                resolve:{
                    orderInfo:function(resourcePool,$stateParams){
                        let genre = $stateParams.genre;
                        if(genre == 0){
                            return resourcePool.getConfirmOrderInfo.request({
                                id:$stateParams.orderid,
                                genre:$stateParams.genre,
                                partyid:$stateParams.partyid
                            })
                        }
                        if(genre == 1){
                            return resourcePool.getConfirmOrderInfo.request({
                                genre:$stateParams.genre,
                                partyid:$stateParams.partyid,
                            })
                        }
                    }
                }
            })
    });


class SuccessInfoController {
    constructor (orderInfo,application,$stateParams) {
        "ngInject"
        this.name = 'successInfo';
        this.application = application;
        this.orderInfo = orderInfo.data.info;
        this.stateParams = $stateParams;
        this.headHost = application.headHost;
    }

    backGroup(){
        window.location.replace('/myGroup')
    }
    backBar(){
        let _this = this;
        window.location.replace('/index')
    }
}