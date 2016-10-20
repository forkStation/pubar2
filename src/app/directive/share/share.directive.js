/**
 * Created by apple on 16/5/30.
 */

export default function(){
    'ngInject';
    return{
        restrict:'EA',
        scope:true,
        controllerAs:'vm',
        controller:shareController,
        template:'<i ng-click="vm.share()" class="ion-android-share-alt icon"></i>'
    }
}

class shareController{
    constructor($ionicModal,$scope){
        'ngInject';
        this.name='share';
        this.share = function () {
            $scope.modal = $ionicModal.fromTemplate('<share-list></share-list>',{
                scope:$scope,
                animation:'slide-in-up'
            });
            $scope.modal.show();
        }
        $scope.$on('share.hide',function(){
            $scope.modal.hide();
        })
    }
}