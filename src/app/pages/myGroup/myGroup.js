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
        this.getMyCreateParty = getMyCreateParty.data.info || [];
        this.getMyJoinParty = getMyJoinParty.data.info || [];
        this.imgHost = application.imgHost;
        this.headHost = application.headHost;
        this.windowHeight = document.documentElement.clientHeight - document.getElementById('group-tabs').clientHeight;
        let _this = this;
        for(var i = 0;i<_this.getMyJoinParty.length;i++){
            if(_this.getMyJoinParty[i]['isaduit']==1){
                _this.getMyJoinParty[i]['isaduitDetail'] = '待审核'
            }
            if(_this.getMyJoinParty[i]['ispay']==1){
                _this.getMyJoinParty[i]['ispayDetail'] = '待付款'
            }
        }
        console.log(_this.getMyJoinParty);

    }

}