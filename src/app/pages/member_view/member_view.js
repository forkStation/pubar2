import tpl from './member_view.jade'
import './member_view.scss'
import { angular, ionic } from 'library'

export default angular.module('member_view',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('member_view', {
                url: '/member_view/:id',
                controllerAs: 'vm',
                controller: Member_viewController,
                template: tpl(),
                resolve:{
                    userInfo: function(resourcePool,$stateParams){
                        return resourcePool.getUserInfo.request({
                            userid:$stateParams.id
                        })
                    }
                }
            })
    });
class Member_viewController {
    constructor (userInfo) {
        "ngInject"
        this.name = 'member_view';
        this.item = userInfo.data.info;
    }
}