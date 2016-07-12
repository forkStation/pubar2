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
                var defaultAllowApi = ['bar_list','bar_info','barfriend_list','get_city','drink_info','drink_list','drink_cate','party_list','wx_login','login','regsms','wx_login','bind'];
                var userInfo = JSON.parse(window.localStorage.getItem('userInfo'));

                params.userid = userInfo ? userInfo[0].id : 0;


                let ua = window.navigator.userAgent.toLowerCase();
                let userid = userInfo ? userInfo[0].id : 0;
                if (ua.match(/MicroMessenger/i) == "micromessenger" && params.userid === 0 && defaultAllowApi.indexOf(apiName) === -1) {
                    //在微信中打开
                    t.$http({
                        url:'api/weixin/wx_login',
                        params:{
                            userid:userid
                        }
                    }).then(res=>{
                        console.log(res);
                        return false;
                    })

                }

                if(defaultAllowApi.indexOf(apiName) === -1 && params.userid === 0){
                    location.href='/phoneLogin'
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
    pay(apiName){
        return this.create('wpay',apiName)
    }

    chat(apiName){
        return this.create('msgchat',apiName)
    }

    wx(apiName){
        return this.create('weixin',apiName)
    }

}