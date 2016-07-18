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
                            partyid:$stateParams.id
                        })
                    }
                }
            })
    });


class GroupOrderListController {
    constructor (detail,application) {
        "ngInject"
        this.name = 'groupOrderList';
        let t = this;
        this.detail = detail.data.info;
        this.headHost = application.headHost;
        this.total = 0;
        angular.forEach(t.detail.drinklist,function(value,key){
            console.log(value);
            t.total = parseFloat(value.count) * parseFloat(value.price) + t.total
        });
        console.log(t.total)
    }
}