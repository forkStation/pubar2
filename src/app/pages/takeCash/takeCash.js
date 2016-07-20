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
    constructor (getDrawInfo) {
        "ngInject"
        this.name = 'takeCash';
        this.info = getDrawInfo.data.info;
    }
}