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
        },
        template: template(),
        controller: CartController,
        controllerAs: 'vm',
        link: function (scope, ele, attr, ctrl) {
            let orginTop = - 0.2;
            let toTop;
            let isBottom=true;

            scope.total = 0;

            /**
             * 点击购物车按钮图标的时候,加载购物车列表数据
             */
            scope.popup = function () {
                isBottom?moveTop():moveBottom();
                isBottom=!isBottom;
                getData();
            };
            getTotal();

            scope.$on('updateStorage',function(){
                getTotal();
            });
            function moveTop () {
                ele[0].style.top = "-5.1rem"
            }
            function moveBottom () {
                ele[0].style.top = "-0.2rem"
            }

            function getTotal(){
                var storageData = JSON.parse(window.localStorage.getItem('bar'+scope.barid));
                scope.total = 0;

                angular.forEach(storageData,function(value,key){
                    scope.total = parseInt(value.number)+scope.total;

                });
            }

            function getData(){
                scope.cartItem = JSON.parse(window.localStorage.getItem('bar'+scope.barid));
            }
      

            /**
             * 清除购物车
             */
            scope.clearAll = function(){
                scope.cartItem = [];  //清除已加载数据
                window.localStorage.removeItem('bar'+scope.barid);  //清除当前酒吧的缓存
            }
        }
    }
};


class CartController {
    constructor ($scope, $ionicBackdrop) {
        "ngInject";
        // $ionicBackdrop.retain();
    }

}