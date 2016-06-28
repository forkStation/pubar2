import tpl from './avatar.jade'
import './avatar.scss'
import { angular, ionic } from 'library'
import cropper from 'cropper'

export default angular.module('avatar',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('avatar', {
                url: '/avatar',
                controllerAs: 'vm',
                controller: AvatarController,
                template: tpl()
            })
    });


class AvatarController {
    constructor ($scope,$window) {
        "ngInject"
        this.name = 'avatar';

        console.log(cropper);
        $scope.cropper = {};
        $scope.cropper.sourceImage = null;
        $scope.cropper.croppedImage   = null;
        $scope.bounds = {};
        $scope.bounds.left = 0;
        $scope.bounds.right = 0;
        $scope.bounds.top = 0;
        $scope.bounds.bottom = 0;

        
        $scope.windowWidth = $window.document.documentElement.clientWidth;

    }
}