/**
 * Created by apple on 16/6/21.
 */

export default function () {
    return {
        restrict: 'E',
        template: '<div id="map" style="height:400px;"></div>',
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
}