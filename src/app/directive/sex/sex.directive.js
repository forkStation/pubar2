/**
 * Created by apple on 16/6/10.
 */
import './sex.scss'
export default function(){
    return{
        restrict:'E',
        template:'<i class="ion sex {{vm.sex}}"></i>',
        controllerAs:'vm',
        controller:sexController,
        replace:true,
        scope:{
            type:'@type'
        }
    }
}

class sexController{
    constructor($scope){
        'ngInject'
        this.name='sex';
        let type = $scope.type;
        if(type==1)
            this.sex=' ion-female female';
        if(type==0)
            this.sex=' ion-male male';
    }
}