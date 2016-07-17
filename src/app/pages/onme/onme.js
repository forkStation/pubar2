import tpl from './onme.jade'
import './onme.scss'
import { angular, ionic } from 'library'

export default angular.module('onme',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('onme', {
                url: '/onme/:id?barid',
                controllerAs: 'vm',
                controller: OnmeController,
                template: tpl(),
                resolve:{
                    barDetail:function(resourcePool,$stateParams){
                        return resourcePool.getBarInfo.request({
                            'barid':$stateParams.barid
                        })
                    },
                    userInfo:function(resourcePool,$stateParams){
                        return resourcePool.getUserInfo.request({
                            fid:$stateParams.id
                        })
                    }
                }
            })
    });


class OnmeController {
    constructor (application,barDetail,userInfo) {
        "ngInject"
        this.name = 'onme';

        this.headHost = application.headHost;
        this.imgHost = application.imgHost;
        this.barDetail = barDetail.data.info;
        this.userInfo = userInfo.data.info;

    }
}