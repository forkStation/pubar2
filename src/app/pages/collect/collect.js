import tpl from './collect.jade'
import './collect.scss'
import { angular, ionic } from 'library'
import imgResource from 'assets/images'

export default angular.module('collect',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('collect', {
                url: '/collect',
                controllerAs: 'vm',
                controller: CollectController,
                template: tpl(),
                resolve:{
                    collects:function(resourcePool,application){
                        return resourcePool.getCollectList.request({
                            userid:application.userId
                        })

                    }
                }
            })
    });


class CollectController {
    constructor (collects,application) {
        "ngInject"
        this.name = 'collect';
        this.barAvatarDemo = imgResource.barAvatarDemo;

        if(collects.data.status ==1){
            this.collects = collects.data.info;
        }

        this.imgHost = application.imgHost;
    }

    goBarDetail(id){
        let t = this;
        t.state.go('barDetail',{id:id});
    }
}