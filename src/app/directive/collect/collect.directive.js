/**
 * Created by apple on 16/6/7.
 */


export default function(){
    'ngInject'
    return {
        restrict:'E',
        replace:true,
        scope:true,
        template:'<i class="collect icon "></i>',
        controllerAs:'vm'
    }
}
