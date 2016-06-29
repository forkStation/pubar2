import tpl from './create.jade'
import './create.scss'
import { angular, ionic } from 'library'
import imgSrc from 'assets/images'
export default angular.module('create',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('create', {
                url: '/create/:barid',
                controllerAs: 'vm',
                controller: CreateController,
                template: tpl()
            })
    });


class CreateController {
    constructor ($stateParams,resourcePool) {
        "ngInject"
        this.name = 'create';
        this.picWall = imgSrc.barAvatarDemo;
        let t = this;
        t.params = $stateParams;
        t.resource = resourcePool;
        t.borg = [
            {id:0, text:'半男半女'},
            {id:1,text:'只限女性'},
            {id:2,text:'只限男性'},
            {id:3,text:'无限制'}

        ];
        t.type=[
            {id:0,text:'本大爷请客'},
            {id:1,text:'AA'},
            {id:2,text:'男A女免'}
        ];
        t.audit = [
            {id:0,text:'无需审核'},
            {id:1,text:'需要我的审核'}
        ];
        t.borgValue = {id:3, text:'无限制'};
        t.typeValue = {id:0,text:'本大爷请客'};
        t.auditValue = {id:0,text:'无需审核'};
        console.log(t.auditValue);
        t.form = {
            subject:'',
            startTime:'',
            num:0,
            borg:0,
            type:0,
            audit:0
        }
    }
    submitParty(){
        let t = this;
        t.form.borg = t.borgValue.id;
        t.form.type = t.typeValue.id;
        t.form.audit = t.auditValue.id;
        console.log(t.form);
    }
}