import tpl from './morectrl.jade'
import './morectrl.scss'
import { angular, ionic } from 'library'

export default angular.module('morectrl',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('morectrl', {
                url: '/morectrl',
                controllerAs: 'vm',
                controller: MorectrlController,
                template: tpl()
            })
    });


class MorectrlController {
    constructor ($ionicActionSheet,$ionicPopup) {
        "ngInject"
        this.name = 'morectrl';
        this.actionSheet = $ionicActionSheet;
        this.popup = $ionicPopup;
    }

    //弹出底部菜单
    openAction(){
        let t = this;
        t.actionSheet.show({
            buttons: [
                { text: '确定' }
            ],
            titleText:'加入黑名单后对方将无法看到你任何信息',
            cancelText:'取消',
            buttonClicked:function(index){
                if(index===0){

                    t.popup.show({
                        title:'已加入黑名单',
                        template:'可以在设置-黑名单里解除',
                        buttons:[{text:'确定',onTap:function(){
                            return true;
                        }}]

                    });

                }
            }
        })
    }
}