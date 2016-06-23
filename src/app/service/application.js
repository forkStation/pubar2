/**
 * Created by apple on 16/6/18.
 */

import {angular,ionic} from 'library'
export default function(){
    return {
        'imgHost':'http://app.pubar.me/mgr/uploadImages/barImg/',
        'map':{
            open:function(args){
                var map = new AMap.Map(args.container,{
                    zoom: 10,
                    center: [args.longitude,args.latitude]
                });
                console.log(map);

            }
        },
        'assets':'http://h5.pubar.me/lib/images/',
        'userId':10059,
        'getMyCity':'广州'
    }
}