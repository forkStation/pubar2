import {angular, ionic} from 'library'

export default angular.module('app.run', [])

    .run(function (resourcePool, $location, $rootScope) {
        'ngInject'


        /**
         * 1` 从本地中获取存储的userInfo和token,如果没有保存过用户的数据则2
         * 2` 进入授权登录,根据取回的url参数请求获取userInfo的数据
         * 3` 如果没有的话,判断是否微信登录
         * 4` 保存userInfo和token到本地
         */
        let storage = window.localStorage;
        var userInfo = JSON.parse(storage.getItem('userInfo'));
        let ua = window.navigator.userAgent.toLowerCase();

        // 1
        if (!userInfo) {

            // 2 获取参数
            let code = getParameters('code');
            let userid = getParameters('userid');
            let t = getParameters('t');
            if (code && userid && ua.match(/MicroMessenger/i) == "micromessenger") {
                resourcePool.getTokenUser.request({
                    code: code,
                    userid: userid,
                    t: t
                }).then(res => {
                    if (res.data.status === 1) {
                        storage.setItem('userInfo', JSON.stringify(res.data.info));
                    }
                })
            }
            // 3
            else if (ua.match(/MicroMessenger/i) == "micromessenger") {
                //在微信中打开
                window.location.replace('http://i5api.pubar.me/index.php/weixin/wx_login');
                // window.location.replace('http://api.pubar.me/index.php/weixin/wx_login');
            }
        } else {
            resourcePool.getMsgCount.request({

            }).then(res => {
                $rootScope.msgCount = ~~res.data.info[0].count;
            })
        }


        function getParameters(name) {
            var location = $location.absUrl();
            var link = location.substr(location.lastIndexOf("?") + 1, location.length + 1);
            var arr = link.split("&");
            var obj = {};
            for (let i = 0; i < arr.length; i++) {
                obj[arr[i].substring(0, arr[i].indexOf("=")).toLowerCase()] = arr[i].substring(arr[i].indexOf("=") + 1, arr[i].length);
            }
            var returnValue = obj[name.toLowerCase()];
            if (typeof (returnValue) == "undefined") {
                return "";
            } else {
                return returnValue;
            }
        }


    })