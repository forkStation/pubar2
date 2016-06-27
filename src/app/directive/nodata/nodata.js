/**
 * Created by apple on 16/6/27.
 */
import tpl from './nodata.jade'
import './nodata.scss'
export default function(){
    'ngInject'
    return {
        replace:true,
        restrict:'E',
        template:tpl(),
        controllerAs:'vm'
    }
}