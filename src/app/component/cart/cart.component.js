import template from './cart.jade';
import './cart.scss';
import {angular,ionic} from 'library'

export default function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            number: '<',
            barid:'=',
            onChange:'&',
            onClear:'&'
        },
        template: template(),
        controller: CartController,
        controllerAs: 'vm',
        link: function (scope, ele, attr, ctrl) {
            let orginTop = - 0.2;
            let toTop;
            let isBottom=true;

            /**
             * 点击购物车按钮图标的时候,加载购物车列表数据
             */
            scope.popup = function () {
                isBottom?moveTop():moveBottom();
                isBottom=!isBottom;
                scope.getStorageData();
            };

            scope.getStorageData = function(){
                var storage = window.localStorage;
                scope.cartItem = JSON.parse(storage.getItem('bar'+scope.barid));
                scope.total = 0;
                scope.sum = 0;
                angular.forEach(scope.cartItem,function(value,key){
                    scope.total = parseFloat(value.price*value.number) + scope.total;
                    scope.sum = parseInt(value.number)+scope.sum;
                });
            };

            scope.getStorageData();
            function moveTop () {
                ele[0].style.top = "-5.1rem"
            }
            function moveBottom () {
                ele[0].style.top = "-0.2rem"
            }
      

            /**
             * 清除购物车
             */
            scope.clearAll = function(){
                scope.cartItem = [];  //清除已加载数据
                window.localStorage.removeItem('bar'+scope.barid);  //清除当前酒吧的缓存
                scope.onChange();
                scope.onClear();
                
            }
        }
    }
};


class CartController {
    constructor ($scope, $ionicBackdrop) {
        "ngInject";
        // $ionicBackdrop.retain();
        console.log($scope)
    }

}