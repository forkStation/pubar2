/**
 * Created by apple on 16/6/18.
 */

import {angular,ionic} from 'library'
import md5 from 'md5'
export default function(storedb,resourcePool){
    'ngInject'


    return {
        'imgHost':'http://h5admin.pubar.me/public/images/pic/',
        'headHost':'http://api.pubar.me/Uploads/png/',
        'productHost':'http://h5admin.pubar.me/public/images/drinkImg/',
        'map':{
            open:function(args){
                var map = new AMap.Map(args.container,{
                    zoom: 10,
                    center: [args.longitude,args.latitude]
                });
                console.log(map);

            }
        },
        loginCtrl:function(){
            if(storedb.key('userInfo')){
                return storedb.key('userInfo').find()[0]['id'];
            }else{
                return function(){
                    location.href='/phoneLogin'
                }
            }
        },
        'assets':'http://h5.pubar.me/lib/images/',
        'getMyCity':function(){
            var st = storedb.key('city').find();
            if(st){
                return st[0]['cityName'];
            }else{
                return '广州'
            }
        },
        /**
         *
         * @param action 【非必填，默认1】是否需要处理，1需要，0不需要
         * @param content 【非必填】信息内容
         * @param reid 接收信息的用户id
         * @param type type 1:好友关注 2：酒局申请 3：同意加入酒吧，4：拒绝加入酒局 5：酒吧已接单 6：酒吧不
         */
        'sendMsg':function(reid,type,action,content){
            return resourcePool.sendMsg.request({
                reid:reid,
                type:type,
                action:action,
                content:content
            });
        },
        'im':{
            getSocket:function(){
                let socket ;
                if(window.io){
                    socket = window.io.connect("http://h5.pubar.me:3000");
                }else{
                    let ioScript = document.createElement('script');
                    ioScript.src='http://cdn.bootcss.com/socket.io/1.4.6/socket.io.js';
                    document.documentElement.appendChild(ioScript);
                    socket = window.io.connect("http://h5.pubar.me:3000");
                }
                //注册自己的socket

                let userInfo = JSON.parse(window.localStorage.getItem('userInfo'));


                socket.emit('new user',userInfo.id);
                return socket;
            },
            open:function(){
                var socket = this.getSocket();

            },

            send:function(to,content,successCallback,failedCallback){
                let socket = this.getSocket();
                let userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
                var params = {
                    reid:to,
                    userid:userInfo.id,
                    msg:content,
                    token:md5(to+userInfo.id+'usertoken')
                };
                socket.emit('chat',params,res=>{
                    if(res ==1 || res ==2){
                        if(successCallback && typeof successCallback === 'function') successCallback();
                    }else{
                        if(failedCallback && typeof failedCallback === 'function') failedCallback();
                    }
                })
            },

            getChatUsers:function(){
                let _this = this;
                let socket = _this.getSocket();
                return resourcePool.getChatUsers.request({
                    callback:'chater'
                })
            }
        },
        'wechatPay':function(appInfo,success,failed){
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId": appInfo['appId'],
                    "timeStamp": appInfo.timeStamp.toString(),
                    "nonceStr": appInfo.nonceStr,
                    "package": appInfo.package,
                    "signType": appInfo.signType,
                    "paySign": appInfo.paySign
                },
                function (res) {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        if(success && typeof success == 'function') success();
                    }
                    else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
                        if(failed && typeof failed == 'function') failed();
                    }
                    else {
                        if(failed && typeof failed == 'function') failed();
                    }
                }
            );
        }
    }
}