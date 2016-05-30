'use strict';
import tpl from './filter.tpl.jade'

export default function () {
    'ngInject';
    return {
        restrict:'E',
        template:tpl(),
        controller:filterTplController,
        controllerAs:'vm'
    }
}

class filterTplController{

    constructor () {
        'ngInject';
    }
}