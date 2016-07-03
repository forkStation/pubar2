import tpl from './myGroup.jade'
import './myGroup.scss'
import { angular, ionic } from 'library'

export default angular.module('myGroup',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('myGroup', {
                url: '/myGroup',
                controllerAs: 'vm',
                controller: MyGroupController,
                template: tpl(),
                resolve:{
                     getMyCreateParty:function(resourcePool,application){
                         return resourcePool.getMyCreateParty.request({
                            userid:application.userId
                        })
                    },
                    getMyJoinParty:function(resourcePool,application){
                        return resourcePool.getMyJoinParty.request({
                            userid:application.userId
                        })
                    }
                }
            })
    });


class MyGroupController {
    constructor ($ionicSlideBoxDelegate,getMyCreateParty,getMyJoinParty,application) {
        "ngInject"
        this.name = 'myGroup';
        this.slideIndex = 0;
        this.goSlide = function(index){
            $ionicSlideBoxDelegate.slide(index);
        };
        console.log(getMyCreateParty);
        this.getMyCreateParty = getMyCreateParty.data.info;
        this.getMyJoinParty = getMyJoinParty.data.info;
        this.imgHost = application.imgHost;
        this.headHost = application.headHost;

    }
    goGroupDetail(id){
        let t = this;
        t.state.go('groupDetail',{id:id});
    }
}