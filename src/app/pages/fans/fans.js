import tpl from './fans.jade'
import './fans.scss'
import { angular, ionic } from 'library'
import img from 'assets/images'
export default angular.module('fans',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('fans', {
                url: '/fans',
                controllerAs: 'vm',
                controller: FansController,
                template: tpl(),
                resolve:{
                    getFansList:function(resourcePool,application){
                        return resourcePool.getFansList.request({})
                    }
                }
            })
    });


class FansController {
    constructor (getFansList,application) {
        "ngInject"
        this.name = 'fans';
        this.slideIndex = 0;
        this.chatGroupImg = img.chatGroupImg;
        this.chatFansImg = img.chatFansImg;
        this.list = getFansList.data.info;
        this.headHost = application.headHost;
        this.searchTxt = '';

    }
}