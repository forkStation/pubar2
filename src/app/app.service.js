/**
 * Created by wj on 2016/6/6.
 * happy everyday!
 */
'use strict'

import { angular, ionic } from "library"
import Token from './service/token'

export default angular.module('app.service', ['ionic'])
    .service('token',Token)