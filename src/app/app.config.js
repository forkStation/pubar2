'use strict';
angular
  .module('MicroWebApp')
  .config(function ($compileProvider, $provide, $animateProvider) {
    /* eslint-disable  */
    //链接白名单
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript|tel):/);
    $animateProvider.classNameFilter(/angular-animate/);

    $provide.decorator('$rootScope', function ($delegate) {
      angular.extend($delegate.__proto__, {
        isMobile: window.isMobile,
        isIOS: window.isIOS,
        isAndroid: window.isAndroid,
        isIE: window.isIE,
        isIOS7: window.isIOS7,
        isWechat: window.isWechat,
        DEBUG: window.DEBUG,
        XAnalytics: window.XAnalytics
      });

      return $delegate;
    });

  })
  .constant({
    PRODUCT_UNIQUE_ID_JOINER: '@' // 商品 unique id 连接符
  });

