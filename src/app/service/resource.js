/**
 * Created by wj on 2016/6/7.
 * happy everyday!
 */
'use strict'
/**
 * 资源处理文件
 */
export default class Resource {
    constructor(token,$http){
        'ngInject'
        this.token = token
        this.$http = $http
    }

    _create(module,apiName){
        return `/api/${module}/${apiName}`
    }

    create(module,apiName){
        const url = this._create(module,apiName)

        return {
            request: (params,method = 'get',config)=>{
                return this.$http(Object.assign({ params,method,url },config))
            }
        }
    }

    bar(apiName){
        return this.create('bar',apiName)
    }

    city(apiName){
        return this.create('city',apiName)
    }

    drink(apiName){
        return this.create('drink',apiName)
    }

    Meb(apiName){
        return this.create('Meb',apiName)
    }

    order(apiName){
        return this.create('order',apiName)
    }

    party(apiName){
        return this.create('party',apiName)
    }


}