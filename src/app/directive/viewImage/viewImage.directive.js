/**
 * Created by apple on 16/8/18.
 */

import jade from './viewImage.jade'
import './viewImage.scss'
import {angular,ionic} from 'library'

export default function ($ionicModal) {
    "ngInject"
    return {
        restrict:"EA",
        controllerAs:'vm',
        controller:viewImageController,
        link:function (scope,elem,attr) {
            scope.windowHeight = document.documentElement.clientHeight;
            scope.modal = null;
            angular.element(elem)[0].onclick=function () {
                scope.modal = $ionicModal.fromTemplate(jade(),{
                    animation:'slide-in-up',
                    scope:scope
                });
                scope.modal.show();
            };

        },
        scope:{
            images:'=images'
        }

    }
}

class viewImageController{
    constructor($scope,application,$rootScope){
        "ngInject"

        let _this = this;
        _this.headHost = application.headHost;
        _this.rootScope = $rootScope;

        _this.images = [];
        for(let i =0;i<$scope.images.length;i++){
            _this.images.push({
                id:parseInt(Math.random()*99999+(Math.random()*99999+1)*i),
                src:$scope.images[i]
            })
        }
        $scope.hideModal = function(){
            $scope.modal.hide();
        }
    }

}