/**
 * Created by apple on 16/8/13.
 */

import jade from './share.list.jade'
import './share.list.scss'
export default function () {
    "ngInject"
    return {
        restrict:'E',
        controllerAs:'vm',
        controller:shareListController,
        scope:{},
        replace:true,
        template:jade
    }
}

class shareListController{
    constructor($rootScope){
        "ngInject";
        this.rootScope = $rootScope;
    }

    shareTo(target){
        this.rootScope.$broadcast("share.command",target)
    }
}