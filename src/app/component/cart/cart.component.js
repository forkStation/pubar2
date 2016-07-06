import template from './cart.jade';
import './cart.scss';

export default function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            number: '<',
            barid:'='
        },
        template: template(),
        controller: CartController,
        controllerAs: 'vm',
        link: function (scope, ele, attr, ctrl) {
            let orginTop = - 0.2;
            let toTop;
            let isBottom=true;


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
        }
    }
};


class CartController {
    constructor ($scope, $ionicBackdrop) {
        "ngInject";
        // $ionicBackdrop.retain();
    }
}