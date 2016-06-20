import tpl from './groupOrderList.jade'
import './groupOrderList.scss'
import { angular, ionic } from 'library'

export default angular.module('groupOrderList',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('groupOrderList', {
                url: '/groupOrderList/:id',
                controllerAs: 'vm',
                controller: GroupOrderListController,
                template: tpl(),
                resolve:{
                    detail:function(resourcePool,$stateParams){
                        return resourcePool.getPartyInfo.request({
                            id:$stateParams.id
                        })
                    }
                }
            })
    });


class GroupOrderListController {
    constructor (detail) {
        "ngInject"
        this.name = 'groupOrderList';
        this.detail = detail.data.info;

    }
}