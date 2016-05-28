/**
 * Created by wj on 2016/5/28.
 */
import { angular, ionic } from "library"
import demo from './components/demo.directive'

export default app.module('app.component', [ionic])
    .directive('demo', demo)