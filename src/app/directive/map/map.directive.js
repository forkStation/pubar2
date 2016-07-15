/**
 * Created by apple on 16/6/21.
 */

export default function () {
    return {
        restrict: 'E',
        template: '<div id="map" style="height:400px;display: none"></div>',
        controllerAs: 'vm',
        controller: mapController,
        replace: true,
        scope: {
            longitude: '@longitude',
            latitude: '@latitude',
            id: '@id'
        }
    }
}

class mapController {
    constructor($scope) {
        'ngInject';
        this.name = 'map.directive';

        var _initMap = function () {
            
            var map = new AMap.Map('map', {
                zoom: 14,
                center: [$scope.longitude, $scope.latitude]
            });
            var marker = new AMap.Marker({
                position: map.getCenter()
            });
            marker.setMap(map);
            // 设置鼠标划过点标记显示的文字提示
            marker.setTitle('我是marker的title');
            // 设置label标签
            marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                offset: new AMap.Pixel(20, 20),//修改label相对于maker的位置
                content: "我是marker的label标签"
            });
        }
        /**
         * 校验AMap全局变量是否存在
         * 如果存在,自己初始化地图
         * 否则,动态引入脚本,脚本完成加载,初始化地图
         */
        if (window.AMap == undefined) {
            let mapScript = document.createElement('script');
            mapScript.src = 'http://webapi.amap.com/maps?v=1.3&key=2f68d8bce4d678228a3e0ee7341b6ee6';
            document.body.appendChild(mapScript);
            //script加载完毕,初始化地图
            mapScript.onload = function () {
                _initMap();
            }
        } else {
            _initMap();
        }
    }
}