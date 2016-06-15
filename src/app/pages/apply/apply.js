import tpl from './apply.jade'
import './apply.scss'
import { angular, ionic } from 'library'
import imgSrc from 'assets/images'

export default angular.module('apply',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('apply', {
                url: '/apply',
                controllerAs: 'vm',
                controller: ApplyController,
                template: tpl()
            })
    });


class ApplyController {
    constructor ($ionicActionSheet,$scope) {
        "ngInject"
        this.name = 'apply';
        this.picWall = imgSrc.barAvatarDemo;
        this.actionSheet = $ionicActionSheet;
    }

    blacklist(){
        let t = this;
        t.actionSheet.show({
            destructiveText: '确定',
            titleText: '加入黑名单后对方将无法继续申请',
            cancelText: '取消',
            destructiveButtonClicked:function(){
                // coding goes here
                return true;
            }
        });
    }
    reject(){
        let t = this;
        t.actionSheet.show({
            destructiveText: '确定',
            titleText: '拒绝对方加入酒局吗?',
            cancelText: '取消',
            destructiveButtonClicked:function(){
                // coding goes here
                return true;
            }
        });
    }
}