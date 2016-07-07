import template from './cart.jade';
import './cart.scss';

export default function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            number: '<',
            barid:'=',
            onHandle:'&',
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
                var storage = window.localStorage;
                scope.cartItem = JSON.parse(storage.getItem('bar'+scope.barid));
                console.log(scope.cartItem);
            };

            scope.myFilter = function(item){
                return item.num > 0;
            };
            function moveTop () {
                ele[0].style.top = "-5.1rem"
            }
            function moveBottom () {
                ele[0].style.top = "-0.2rem"
            }
            scope.resetCartList = function(item){
                console.log(item);
                if(item.num<=0){
                    console.log('0')
                    scope.cartItem.splice(scope.cartItem.indexOf(),1)
                }
                scope.onHandle();
            };

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
        console.log($scope)
    }

}