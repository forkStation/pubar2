/**
 * Created by wj on 2016/6/7.
 * happy everyday!
 */
'use strict'

import token from './token'
/**
 * 资源处理文件
 */
export default class Resource {
    constructor($http,storedb) {
        'ngInject'
        this.token = token
        this.$http = $http
        this.storedb = storedb;
    }

    _create(module, apiName) {
        return `/api/${module}/${apiName}`
    }

    create(module, apiName) {
        const url = this._create(module, apiName);
        let t = this;
        return {
            request: (params, method = 'get', config)=> {
                var defaultAllowApi = ['bar_list','bar_info','barfriend_list','get_city','drink_info','drink_list','drink_cate','party_list','wx_login','login','regsms'];
                
                if(defaultAllowApi.indexOf(apiName)==-1){
                    if(t.storedb.key('userInfo').find()){
                        params.userid = t.storedb.key('userInfo').find()[0]['id'];
                    }else{
                        location.href='/phoneLogin'
                    }
                }else{
                    if(t.storedb.key('userInfo').find()){
                        params.userid = t.storedb.key('userInfo').find()[0]['id'];
                    }else{
                        params.userid = 0;
                    }
                }

                let opt = Object.assign({params, method, url});
                return this.$http(opt, config)
            }
        }
    }
    bar(apiName) {
        return this.create('bar', apiName)
    }

    city(apiName) {
        return this.create('city', apiName)
    }

    drink(apiName) {
        return this.create('drink', apiName)
    }

    Meb(apiName) {
        return this.create('Meb', apiName)
    }

    order(apiName) {
        return this.create('order', apiName)
    }

    party(apiName) {
        return this.create('party', apiName)
    }
    friend(apiName){
        return this.create('friend',apiName)
    }
    user(apiName){
        return this.create('user',apiName)
    }
    msg(apiName){
        return this.create('msg',apiName)
    }
    wallet(apiName){
        return this.create('wellet',apiName)
    }
    avatar(apiName){
        return this.create('user',apiName)
    }


}