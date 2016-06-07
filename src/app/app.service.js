/**
 * Created by wj on 2016/6/6.
 * happy everyday!
 */
'use strict'

import { angular,ionic } from "library"
import Token from './service/token'
import resource from './service/resource'
import resourcePool from  './service/resourcePool'

export default angular.module('app.service',['ionic'])
    .service('token',Token)
    .service('resource',resource)
    .factory('resourcePool',resourcePool)