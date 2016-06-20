/**
 * Created by apple on 16/6/18.
 */

import {angular,ionic} from 'library'
export default function(){
    return {
        'imgHost':'http://app.pubar.me/mgr/uploadImages/barImg/',
        'map':{
            open:function(args){
                let _t = this;
                _t.args = {};
                angular.forEach(args,function(value,key){
                    _t.args[key] = value;
                });

                var map = new AMap.Map(args.container,{
                    zoom: 10,
                    center: [args.longitude,args.latitude]
                });

            }
        }
    }
}