/**
 * Created by wj on 2016/5/28.
 */
import { angular, ionic } from "library"
import cart from './component/cart/cart.component'
import numberPick from './component/numberPick/numberPick.component'
import location from './component/location/location'
import filter from './component/filter/filter.tpl'

export default angular.module('app.component', [ionic])
    .directive('cart', cart)
    .directive('numberPick',numberPick)
    .component('filter',filter)
    .component('location',location)