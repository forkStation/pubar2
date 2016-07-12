/**
 * Created by apple on 16/7/7.
 */

import tpl from './codebox.jade'
import  './codebox.scss'

export default function(){
    'ngInject'
    return {
        restrict:'E',
        replace:true,
        template:tpl(),
        controllerAs:'vm',
        scope:{
            password:'='
        },
        controller:codeboxController
    }
}
class codeboxController{
    constructor($scope){
        'ngInject'
        this.name = 'codebox';
        this.codes = [];
        this.scope = $scope;
        console.log($scope.password);
    }
    codeChange(){
        console.log(this.scope.password);
        this.codes = this.scope.password.split('');
    }
}