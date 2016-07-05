import template from './cart.jade';
import './cart.scss';

export default function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            number: '<'
        },
        template: template(),
        controller: CartController,
        controllerAs: 'vm',
        link: function (scope, ele, attr, ctrl) {
            let orginTop = - 0.2;
            let toTop;
            let isBottom=true;

            let cartItem=[
                {
                    name:'蓝带',
                    price:'1288',
                    number:2
                },
                {
                    name:'蓝带',
                    price:'1288',
                    number:2
                },
                {
                    name:'蓝带',
                    price:'1288',
                    number:2
                }
            ];
            
            scope.cartItem=cartItem;

            scope.popup = function () {
                isBottom?moveTop():moveBottom();
                isBottom=!isBottom;
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