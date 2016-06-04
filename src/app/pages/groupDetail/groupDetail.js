import tpl from './groupDetail.jade'
import './groupDetail.scss'
import { angular, ionic } from 'library'
import imgResource from 'assets/images'

export default angular.module('groupDetail',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('groupDetail', {
                url: '/groupDetail',
                controllerAs: 'vm',
                controller: GroupDetailController,
                template: tpl()
            })
    });


class GroupDetailController {
    constructor ($scope,$state) {
        "ngInject"
        this.name = 'groupDetail';
        this.state = $state;

        var _this = this;
        _this.flag = false;
        this.productItem = imgResource.productItem;
        this.showComment = function(){
            _this.flag = true;

        };

        this.chatsMsg = [{
            id:'1',
            msg:'你好',
            avatar:this.productItem,
            user_id:'1124',
            nickname:'李锋染'
        },{
            id:'1',
            msg:'你好啊',
            avatar:this.productItem,
            user_id:'00',
            nickname:'Anna Sui'
        },{
            id:'1',
            msg:'怎么称呼,美女?',
            avatar:this.productItem,
            user_id:'1124',
            nickname:'李锋染'
        },{
            id:'1',
            msg:'Anna',
            avatar:this.productItem,
            user_id:'00',
            nickname:'Anna sui'
        },{
            id:'1',
            msg:'Anna你好',
            avatar:this.productItem,
            user_id:'1124',
            nickname:'李锋染'
        }];

        this.msgInfo = {
            user_id:'00',
            nickname:'Anna sui',
            msg:'',
            avatar:this.productItem,
            id:'sdf'
        };
    }
    goChat(){
        this.state.go('chat')
    }



}