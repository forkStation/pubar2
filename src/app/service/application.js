/**
 * Created by apple on 16/6/18.
 */

import {angular,ionic} from 'library'
export default function(storedb){
    'ngInject'
    console.log(11)
    return {
        'imgHost':'http://h5admin.pubar.me/public/images/pic/',
        'headHost':'http://api.pubar.me/Uploads/png/',
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
        'userId':10000,
        'getMyCity':function(){
            var st = storedb.key('city').find();
            if(st){
                return st[0]['cityName'];
            }else{
                return '广州'
            }
        }
    }
}