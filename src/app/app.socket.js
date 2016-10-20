/**
 * Created by apple on 16/7/23.
 */

export default function($rootScope){
    'ngInject'
    let socket = io.connect("http://h5.pubar.me:3000");
    // let socket = io.connect("http://i5.pubar.me:3000");
    let userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
    socket.emit('new user', userInfo.id);
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    }
}