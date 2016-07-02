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
    constructor ($scope,$window,application,resourcePool,$http) {
        "ngInject"
        this.name = 'avatar';
        this.resource = resourcePool;
        this.application = application;
        this.http = $http;
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
    save(){

        let t = this;
        var http = t.http;

        var form = new FormData();
        form.append('uploadFile',document.getElementById('uploadFile').files[0]);

        http({
            url:'api/user/upload_headIcon',
            params:{
                userid:t.application.userId
            },
            data:form,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity,
            method:'post'
        }).then(res=>{
            console.log(res);
        });


    }
}