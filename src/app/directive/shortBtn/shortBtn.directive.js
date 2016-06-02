/**
 * Created by apple on 16/5/30.
 */
import './shortBtn.scss'
export default function(){
    'ngInject';
    return {
        restrict:'E',
        template:'<button type="button" class="short-btn-active">{{text}}</button>',
        scope:{
          text:'@text'
        },
        controller:shortBtnController,
        controllerAs:'vm',
        replace:true
    }
}

class shortBtnController{
    constructor(){
        this.name='shortBtn'
    }
  
}