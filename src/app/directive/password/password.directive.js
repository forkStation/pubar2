import tpl from './password.jade'
import './password.scss'

export default function(){
    'ngInject'
    return{
        replace:true,
        restrict:'E',
        template:tpl,
        controllerAs:'vm',
        controller:passwordController,
        scope:{
            onHide:'&',
            password:'=',
            onConfirm:'&'
        }
    }
}

class passwordController{
    constructor($scope,$rootScope){
        'ngInject';

        this.scope = $scope;
        this.rootScope = $rootScope;
        $scope.password = [];
    }
    setNum(num){
        let $scope = this.scope;

        if($scope.password.length>=6)return false;
        $scope.password.push(num);
    }
    delNum(){
        let $scope = this.scope;
        $scope.password.pop();
    }
    back(){
        this.scope.onHide();
    }
    printPwd(){
        let $rootScope = this.rootScope;
        let $scope = this.scope;
        $rootScope.$broadcast('password.confirm',$scope.password.join(''));

    }
}