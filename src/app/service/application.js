/**
 * Created by apple on 16/6/18.
 */

import {angular, ionic} from 'library'
import md5 from 'md5'
export default function (storedb, resourcePool, $q) {
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
        loginCtrl: function () {
            if (storedb.key('userInfo')) {
                return storedb.key('userInfo').find()[0]['id'];
            } else {
                return function () {
                    location.href = '/phoneLogin'
                }
            }
        },
        'getMyCity': function () {
            var st = storedb.key('city').find();
            if (st) {
                return st[0]['cityName'];
            } else {
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
        'sendMsg': function (reid, type, action, content) {
            return resourcePool.sendMsg.request({
                reid: reid,
                type: type,
                action: action,
                content: content
            });
        },
        'im': {
            getSocket: function () {
                let socket;
                if (window.io) {
                    socket = window.io.connect("http://h5.pubar.me:3000");
                } else {
                    let ioScript = document.createElement('script');
                    ioScript.src = 'http://cdn.bootcss.com/socket.io/1.4.6/socket.io.js';
                    document.documentElement.appendChild(ioScript);
                    socket = window.io.connect("http://h5.pubar.me:3000");
                }
                //注册自己的socket

                let userInfo = JSON.parse(window.localStorage.getItem('userInfo'));


                socket.emit('new user', userInfo.id);
                return socket;
            },
            open: function () {
                var socket = this.getSocket();

            },

            send: function (to, content, successCallback, failedCallback) {
                let socket = this.getSocket();
                let userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
                var params = {
                    reid: to,
                    userid: userInfo.id,
                    msg: content,
                    token: md5(to + userInfo.id + 'usertoken')
                };
                socket.emit('chat', params, res => {
                    if (res == 1 || res == 2) {
                        if (successCallback && typeof successCallback === 'function') successCallback();
                    } else {
                        if (failedCallback && typeof failedCallback === 'function') failedCallback();
                    }
                })
            },

            getChatUsers: function () {
                let _this = this;
                let socket = _this.getSocket();
                return resourcePool.getChatUsers.request({
                    callback: 'chater'
                })
            }
        },
        'wechatPay': function (appInfo, success, failed) {
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
                        if (success && typeof success == 'function') success();
                    }
                    else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
                        if (failed && typeof failed == 'function') failed();
                    }
                    else {
                        if (failed && typeof failed == 'function') failed();
                    }
                }
            );
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
        }
    }
}