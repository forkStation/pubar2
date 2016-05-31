import tpl from './chat.jade'
import './chat.scss'
import { angular, ionic } from 'library'

export default angular.module('chat',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('chat', {
                url: '/chat',
                controllerAs: 'vm',
                controller: ChatController,
                template: tpl()
            })
    });


class ChatController {
    constructor () {
        "ngInject"
        this.name = 'chat';
        this.chatsMsg = [{
            id:'1',
            msg:'你好',
            avatar:'assets/img/product-item.png',
            user_id:'1124',
            nickname:'李锋染'
        },{
            id:'1',
            msg:'你好啊',
            avatar:'assets/img/product-item.png',
            user_id:'00',
            nickname:'Anna Sui'
        },{
            id:'1',
            msg:'怎么称呼,美女?',
            avatar:'assets/img/product-item.png',
            user_id:'1124',
            nickname:'李锋染'
        },{
            id:'1',
            msg:'Anna',
            avatar:'assets/img/product-item.png',
            user_id:'00',
            nickname:'Anna sui'
        },{
            id:'1',
            msg:'Anna你好',
            avatar:'assets/img/product-item.png',
            user_id:'1124',
            nickname:'李锋染'
        }];
        
        this.msgInfo = {
            user_id:'00',
            nickname:'Anna sui',
            msg:'',
            avatar:'assets/img/product-item.png',
            id:'sdf'
        }
        
    }

    
    sendMsg(){
        var item = this.msgInfo;
        this.chatsMsg.push(item);
    }
}