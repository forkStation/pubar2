
// 'use strict';
// export default angular.module('MicroWebApp')
//     .run(viewChange);
//
// function viewChange ($rootScope) {
//     $rootScope.$on('$stateChangeSuccess', function () {
//         console.log(" view change success");
//     })
// }


for (var x=0;x<10;x++){
    setTimeout(function () {
        console.log(x);
    },10)
}