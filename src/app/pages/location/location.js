import tpl from './location.jade'
import './location.scss'
import { angular, ionic } from 'library'

export default function(){
    'ngInject';
    return {
        restrict:'E',
        template:tpl(),
        controller:LocationController,
        controllerAs:'vm'
    }
}


class LocationController {
    constructor () {
        "ngInject"
        this.name = 'location';
        var data = [
            {id:'aeafda-f1daff','text':'北京',key:'B'},
            {id:'zedwdsdaadaeaen','text':'上海',key:'S'},
            {id:'opomams ','text':'广州',key:'G'},
            {id:'dqqesada','text':'深圳',key:'S'},
            {id:'opomadn','text':'杭州',key:'H'},
            {id:'gerd-qwdsadad','text':'南京',key:'N'},
            {id:'grgwaa','text':'武汉',key:'W'},
            {id:'fsdfsdf','text':'昆明',key:'K'},
            {id:'lklkads','text':'成都',key:'C'}

        ];
        var _sortRule = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var _sortKey = _sortRule.split('');
        var _tempArray = new Array(_sortKey.length);
        var _resultMap = {};
        var i = 0,_len;
        for(_len=data.length;i<_len;i++){
            var _index = _sortRule.indexOf(data[i]['key']);
            if(!(_tempArray[_index] instanceof Array)){
                _tempArray[_index] = [];
            }
            _tempArray[_index].push({
                'id':data[i]['id'],
                'text':data[i]['text']
            })
        }
        for(i=0,_len=_sortKey.length;i<_len;i++){
            if(_tempArray[i]!==undefined){
                _resultMap[_sortKey[i]] = _tempArray[i];
            }
        }
        this.data = _resultMap;
    }
}
