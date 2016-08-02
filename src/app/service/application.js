/**
 * Created by apple on 16/6/18.
 */

import {angular, ionic} from 'library'
import md5 from 'md5'
export default function ( resourcePool, $q,$ionicPopup,$location) {
    'ngInject'
    return {
        'imgHost': 'http://h5admin.pubar.me/public/images/pic/',
        'headHost': 'http://api.pubar.me/Uploads/png/',
        'productHost': 'http://h5admin.pubar.me/public/images/drinkImg/',
        'assets': 'http://h5.pubar.me/lib/images/',
        'map': {
            open: function (args) {
                var map = new AMap.Map(args.container, {
                    zoom: 10,
                    center: [args.longitude, args.latitude]
                });
                console.log(map);

            }
        },

        'getMyCity': function () {
            var st = window.localStorage.getItem('city');
            return st || '广州'
        },
        /**
         *
         * @param action 【非必填，默认1】是否需要处理，1需要，0不需要
         * @param content 【非必填】信息内容
         * @param reid 接收信息的用户id
         * @param type 1:好友关注 2：酒局申请 3：同意加入酒吧，4：拒绝加入酒局 5：酒吧已接单 6：酒吧不接单，7：酒局邀请提醒  8：酒局过期通知  9：拒绝邀请酒局
         */
        'sendMsg': function (reid, type,partyid, action, content) {
            resourcePool.sendMsg.request({
                reid: reid,
                type: type,
                partyid:partyid,
                action: action,
                content: content
            });
        },
        'im': {
            getSocket: function () {
                let socket = io.connect("http://h5.pubar.me:3000");
                //注册自己的socket
                let userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
                socket.emit('new user', userInfo.id);
                return socket;
            },
            open: function () {
                let defer = $q.defer();
                var socket = this.getSocket();
                console.log(socket);
                socket.on('sendSid',result =>{
                    defer.resolve(result);
                });
                return defer.promise;
            },
            loadMsg:function(){

            },

            send: function (to, content) {
                let defer = $q.defer();
                let socket = this.getSocket();
                let userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
                var params = {
                    reid: to,
                    userid: userInfo.id,
                    msg: content,
                    token: md5(to + userInfo.id + 'usertoken')
                };
                socket.emit('chat', params, res => {
                    if (res == 1 || res == 0) {
                        defer.resolve(res);
                    } else {
                        defer.reject(res);
                    }
                });
                return defer.promise;
            },

            getChatUsers: function () {
                let _this = this;
                let socket = _this.getSocket();
                return resourcePool.getChatUsers.request({
                    callback: 'chater'
                })
            }
        },
        'wxConfig':function(url){
            resourcePool.wxConfig.request({
                url:url
            }).then(res=>{
                var appInfo = JSON.parse(res.data.info);
                wx.config({
                    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: appInfo['appId'], // 必填，公众号的唯一标识
                    timestamp:appInfo.timestamp.toString() , // 必填，生成签名的时间戳
                    nonceStr: appInfo.nonceStr, // 必填，生成签名的随机串
                    signature: appInfo.signType,// 必填，签名，见附录1
                    jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
            })

        },
        'wechatPay': function (appInfo, success, failed) {

            wx.chooseWXPay({
                "appId": appInfo['appId'],
                "timeStamp": appInfo.timeStamp.toString(),
                "nonceStr": appInfo.nonceStr,
                "package": appInfo.package,
                "signType": appInfo.signType,
                "paySign": appInfo.paySign,
                success: function (res) {
                    // 支付成功后的回调函数
                    if (success && typeof success == 'function') success(res);
                },
                fail:function(res){
                    if (failed && typeof failed == 'function') failed(res.err_msg);
                }
            });

        },
        getAmap() {
            let defer = $q.defer();
            if (AMap) {
                defer.resolve(AMap)
            } else {
                let mapScript = document.createElement('script');
                mapScript.src = 'http://webapi.amap.com/maps?v=1.3&key=2f68d8bce4d678228a3e0ee7341b6ee6';
                document.body.appendChild(mapScript);
                //script加载完毕,初始化地图
                var t = this;

                mapScript.onload = function () {
                    defer.resolve(AMap)
                }
            }
            return defer.promise;
        },
        getLocation: function () {
            return this.getAmap((AMap) => {
                let defer = $q.defer();
                var map = new AMap.Map('container', {
                    resizeEnable: true
                });
                var geolocation;
                map.plugin('AMap.Geolocation', function () {
                    geolocation = new AMap.Geolocation({
                        enableHighAccuracy: true,//是否使用高精度定位，默认:true
                        timeout: 0,          //超过10秒后停止定位，默认：无穷大
                        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                        zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                        buttonPosition: 'RB'
                    });
                    geolocation.getCurrentPosition();
                    AMap.event.addListener(geolocation, 'complete', function (data) {
                        defer.resolve(data);
                        // if(success && typeof success === 'function') success(data)
                    });//返回定位信息
                });
                return defer.promise;
            })
        },
        info:function(title,content,callback){
            var alertPop = $ionicPopup.alert({
                title: title,
                template: content
            });
            alertPop.then(res=>{
                if(callback && typeof callback==='function')callback(res)
            })
        },
        platform:function(){
            let ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger" ) {
                return 'wechat'
            }
        }

    }
}