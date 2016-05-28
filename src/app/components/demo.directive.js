/**
 * Created by wj on 2016/5/28.
 */
'use strict';
import tpl from './some.jade'

export default function () {
    'ngInject';
    return {
        restrict:'E',
        template:tpl(),
        controller:DemoController,
        controllerAs:'vm'
    }
}

class DemoController{

    constructor () {
        'ngInject';
    }
}