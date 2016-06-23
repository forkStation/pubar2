import tpl from './member_edit.jade'
import './member_edit.scss'
import { angular, ionic } from 'library'
import imgSrc from 'assets/images'

export default angular.module('member_edit',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('member_edit', {
                url: '/member_edit',
                controllerAs: 'vm',
                controller: Member_editController,
                template: tpl(),
                resolve:{

                }
            })
    });


class Member_editController {
    constructor ($ionicActionSheet) {
        "ngInject"
        this.name = 'member_edit';
        this.wall = imgSrc.barAvatarDemo;
        this.actionSheet = $ionicActionSheet;
        this.sexDesc = '男';
    }
    changeSex(){
        let t = this;
        let $ionicActionSheet = t.actionSheet;
        $ionicActionSheet.show({
            buttons: [
                { text: '男' },
                { text: '女' }
            ],
            titleText: '修改性别',
            cancelText: '取消',
            buttonClicked: function(index) {
                if(index===0){
                    t.sexDesc='男'
                }
                if(index===1){
                    t.sexDesc='女'
                }
                return true;
            }
        });

    }
}