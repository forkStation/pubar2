/**
 * Created by apple on 16/6/7.
 */


export default function(){
    'ngInject'
    return {
        restrict:'E',
        replace:true,
        scope:true,
        template:'<i class="ion-android-star icon"></i>',
        controllerAs:'vm',
        link:collectLink
    }
}
class collectLink{
    constructor(scope,el,attr){
        'ngInject'
        this.scope = scope;
        this.el = el;
        this.attr = attr;
        console.log(this.attr);
    }
}