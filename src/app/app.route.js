/**
 * Created by chenzhuokai on 15/10/14.
 */
'use strict';

angular.module('MicroWebApp').config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise(function ($injector) {
    var $state = $injector.get('$state');
    $state.go('merchant.error', null, {location: 'replace'});
  });

  $stateProvider
    .state('merchant', {
      url: '?busiId&busiType&code',
      abstract: true,
      resolve: {
        Config: function (configService, numberCache, elasticSearch, wechatService, localStorageService) {
          return configService.getConfig().then(function (res) {
            numberCache.config = res;
            var loginStatus;

            if (res.ifTourist) {//游客未登录
              loginStatus = 0;
            } else {
              loginStatus = res.ifMember ? 1 : 2;
            }
            elasticSearch.add({
              shopAddress: res.address,
              shopPhone: res.contact,
              shopName: res.title,
              openMicroTime: res.firstOpenTime,
              loginStatus: loginStatus,
              shopFullname: res.fullName
            });

            return res;
          });
        }
      }
    })

    // 商户列表
    .state('merchant.home', {
      url: '/home',
      // pageTitle: '商户列表',// 避免初始化时标题多次变换
      views: {
        '@': {
          templateUrl: './app/pages/home/home.html',
          controller: 'HomeCtrl',
          controllerAs: 'vm'
        }
      }
    })

    // 微店铺
    .state('merchant.shop', {
      url: '/shop',
      views: {
        '@': {
          templateUrl: './app/pages/shop/shop.html',
          controller: 'ShopCtrl',
          controllerAs: 'vm',
          resolve: {
            Dependencies: function ($ocLazyLoad) {
              return $ocLazyLoad.load(['./assets/lib/angular-carousel.min.css', './assets/lib/angular-carousel.min.js']);
            }
          }
        }
      },
      resolve: {
        ShopData: function (resourcePool, $stateParams, $state) {
          if ($stateParams.busiType === 'merchant') {
            return $state.go('merchant.home', $stateParams);
          }
          return resourcePool.shop.get($stateParams).then(function (res) {
            var data = res.model;

            data.shopServiceSupport = _.filter(data.shopServiceSupport, function (item) {
              return item.check || item.enabled;
            });

            return data;
          });
        }
      }
    })
    .state('merchant.shop.carouselDetail', {
      url: '/carousel-detail/:code',
      pageTitle: '轮播详情',
      views: {
        '@': {
          templateUrl: './app/pages/carousel-detail/carousel-detail.html',
          controller: 'CarouselDetailCtrl',
          controllerAs: 'vm'
        }
      }
    })
    .state('merchant.shop.intro', {
      url: '/intro',
      pageTitle: '店铺简介',
      views: {
        '@': {
          templateUrl: './app/pages/shop-intro/shop-intro.html',
          controller: 'ShopIntroCtrl',
          controllerAs: 'vm'
        }
      }
    })
    .state('merchant.shop.product', {
      abstract: true,
      url: '/product?typeCode&orderBy&isSell&isShowResult&searchKey&itemStatus',
      views: {
        '@': {
          templateUrl: './app/pages/product-list/product-list.html',
          controller: 'ProductListCtrl',
          controllerAs: 'vm',
          resolve: {
            proTypes: function (resourcePool) {
              return resourcePool.productTypes.get().then(function (res) {
                return res.collection;
              });
            }
          }
        }
      }
    })
    .state('merchant.shop.product.stroll', {
      url: '/stroll',
      pageTitle: '逛',
      views: {
        '': {
          templateUrl: './app/pages/stroll/stroll.html',
          controller: 'StrollCtrl'
        }
      }
    })
    .state('merchant.shop.product.search', {
      url: '/search',
      pageTitle: '搜索',
      views: {
        '': {
          templateUrl: './app/pages/search/search.html',
          controller: 'SearchCtrl'
        }
      }
    })
    .state('merchant.shop.productDetail', {
      url: '/product-detail/:productCode',
      pageTitle: '商品详情',
      views: {
        '@': {
          templateUrl: './app/pages/product-detail/product-detail.html',
          controller: 'ProductDetailCtrl',
          controllerAs: 'vm',
          resolve: {
            Product: function (resourcePool, $stateParams, elasticSearch) {
              return resourcePool.productInfo.get({
                productCode: $stateParams.productCode,
                busiId: $stateParams.busiId,
                pass: true
              }).then(function (response) {
                var model = response.model;

                elasticSearch.add({
                  productName: model.item.title,
                  productPrice: model.item.curAmount,
                  itemCategoryId: model.item.itemcategoryId,
                  itemCategoryName: model.item.itemcategoryName,
                  productId: model.item.id,
                  productDesc: model.item.detail || null
                });
                // 映射库存的字段名称
                model && (model.item.inventory = model.item.leftCount);

                return model;
              });
            }
          }
        }
      }
    })
    .state('merchant.activity', {
      url: '/activity',
      pageTitle: '逛',
      views: {
        '@': {
          templateUrl: './app/pages/activity/activity.html',
          controller: 'ActivityCtrl',
          controllerAs: 'vm'
          // resolve: {
          //   CarouselList: function (resourcePool) {
          //     return resourcePool.carousel.query({pageSize: 999}).then(function (data) {
          //       return data.collection;
          //     });
          //   }
          // }
        }
      }
    })
    .state('merchant.shop.discount', {
      url: '/discount',
      pageTitle: '店内优惠',
      views: {
        '@': {
          templateUrl: './app/pages/discount/discount.html',
          controller: 'DiscountCtrl',
          controllerAs: 'vm'
        }
      },
      resolve: {
        EticketList: function (resourcePool, $stateParams) {
          return resourcePool.shopCoupon.get({
            channel: 1,
            busiId: $stateParams.busiId,
            busiType: $stateParams.busiType,
            pageSize: 10,
            currentPage: 1
          }).then(function (res) {
            return res.model.list;
          });
        },
        PlatformList: function (ShopData) {
          return ShopData.shopServiceSupport;
        }
      }
    })

    // 购物车
    .state('merchant.cart', {
      url: '/cart',
      pageTitle: '购物车',
      views: {
        '@': {
          templateUrl: './app/pages/cart/cart.html',
          controller: 'CartCtrl',
          controllerAs: 'vm'
        }
      },
      resolve: {
        CartItems: function (CartService) {
          return CartService.all();
        }
      }
    })

    // 支付相关
    // 商品提交订单
    .state('merchant.paymentDetail', {
      url: '/payment-detail?fromState',
      pageTitle: '提交订单',
      onEnter: function (numberCache, $state) {
        //修复从密码修改页面返回时会生成新订单的bug；
        var num = numberCache.orderNumber;
        if (num) $state.go('merchant.orderDetail', {orderNo: num});
      },
      views: {
        '@': {
          templateUrl: './app/pages/payment-detail/payment-detail.html',
          controller: 'PaymentDetailCtrl',
          resolve: {
            OrderData: function (resourcePool, numberCache, $state) {
              var num = numberCache.orderNumber;
              console.log(num);
              if (num) {
                return $state.go('merchant.orderDetail', {orderNo: num});
              }

              return resourcePool.preorder.get().then(function (res) {
                var orderDetail = res.model;
                //获取订单数据,封装
                orderDetail.orderItems = orderDetail.orderItems.map(function (item) {
                  var productInfo = item.item;
                  delete item.item;
                  return angular.extend({}, item, productInfo);
                });

                // 加上订单状态 orderStatus
                return angular.extend(orderDetail, {
                  orderStatus: 'WAIT_PAY'
                });
              });
            }
          }
        }
      }
    })
    .state('merchant.orderDetail', {
      url: '/orderDetail?orderNo',
      pageTitle: '订单详情',
      views: {
        '@': {
          templateUrl: './app/pages/order-detail/order-detail.html',
          controller: 'OrderDetailCtrl',
          resolve: {
            OrderData: function (resourcePool, $stateParams) {
              var orderNo = $stateParams.orderNo;

              if (orderNo) {
                // 订单详情
                return resourcePool.orderDetail.get({orderNo: orderNo}).then(function (res) {
                  var orderDetail = res.model;
                  orderDetail.orderItems = orderDetail.orderItems.map(function (item) {
                    var productInfo = item.item;
                    delete item.item;
                    return angular.extend({}, item, productInfo);
                  });
                  return orderDetail.renameProperty('orderDistributionType', 'distributionType');
                });
              }
            }
          }
        }
      }
    })
    .state('merchant.orderResult', {
      url: '/order-result/{result}?orderNo&type&couponName',
      views: {
        '@': {
          templateUrl: './app/pages/order-result/order-result.html',
          controller: 'OrderResultCtrl',
          controllerAs: 'vm'
        }
      }
    })
    .state('merchant.eticketPaymentDetail', {
      url: '/eticket-payment-detail?orderNo&discountCode',
      views: {
        '@': {
          templateUrl: './app/pages/eticket-payment-detail/eticket-payment-detail.html',
          controller: 'EticketPaymentDetailCtrl',
          controllerAs: 'vm'
        }
      },
      resolve: {
        OrderData: function (resourcePool, $stateParams, $q) {
          var orderNo = $stateParams.orderNo;
          var discountCode = $stateParams.discountCode;
          if (orderNo && !discountCode) {
            // 有订单号但没有电子券编号
            // 进入的是电子券订单详情
            return resourcePool.eticketOrder.get({code: orderNo}).then(function (res) {
              return res.model.order;
            });
          }
          if (!orderNo && discountCode) {
            // 有电子券编号但没有订单号
            // 进入的是电子券购买
            return resourcePool.myEticket.get({
              code: discountCode,
              operation: 'buying'
            }).then(function (res) {
              var order = res.model;
              order.payStatus = 'UNPAID'; // 为了与电子券订单详情统一
              return order;
            });
          }
          return $q.reject('URL param error');
        },
        pageTitle: function ($stateParams, pageTitleService) {
          var title = $stateParams.orderNo ? '电子券订单详情' : '提交电子券订单';
          pageTitleService.update(title);
          return title;
        }
      }
    })

    // 个人中心
    .state('merchant.mine', {
      url: '/mine',
      pageTitle: '个人中心',
      views: {
        '@': {
          templateUrl: './app/pages/mine/mine.html',
          controller: 'MineCtrl',
          controllerAs: 'vm'
        }
      },
      resolve: {
        SimpleMyInfo: function (resourcePool) {
          return resourcePool.simpleMyInfo.get().then(function (res) {
            return res.model;
          });
        },
        Config: function (configService) {
          return configService.getConfig();
        }
      }
    })
    .state('merchant.mine.info', {
      url: '/info?edit',
      pageTitle: '我的资料',
      views: {
        '@': {
          templateUrl: './app/pages/my-info/my-info.html',
          controller: 'MyInfoCtrl',
          controllerAs: 'vm',
          resolve: {
            Dependencies: function ($ocLazyLoad) {
              return $ocLazyLoad.load(['./assets/lib/ng-file-upload.min.js']);
            }
          }
        }
      }
    })
    .state('merchant.mine.vip', {
      url: '/vip',
      pageTitle: '我的会员卡',
      views: {
        '@': {
          templateUrl: './app/pages/my-vip/my-vip.html',
          controller: 'MyVipCtrl',
          controllerAs: 'vm'
        }
      },
      resolve: {
        MyVipInfo: function (resourcePool) {
          return resourcePool.myVip.get().then(function (res) {
            return res.model;
          });
        }
      }
    })
    .state('merchant.mine.offlineOrderList', {
      url: '/offline-order-list',
      pageTitle: '到店消费记录',
      views: {
        '@': {
          templateUrl: './app/pages/offline-order-list/offline-order-list.html',
          controller: 'OfflineOrderListCtrl',
          controllerAs: 'vm'
        }
      }
    })
    .state('merchant.mine.offlineOrderDetail', {
      url: '/offline-order-detail/:orderNumber',
      pageTitle: '消费详情',
      views: {
        '@': {
          templateUrl: './app/pages/offline-order-detail/offline-order-detail.html',
          controller: 'OfflineOrderDetailCtrl',
          controllerAs: 'vm',
          resolve: {
            Order: function (resourcePool, $stateParams) {
              return resourcePool.offlineOrder
                .get({orderNumber: $stateParams.orderNumber}).then(function (data) {
                  return data.model;
                });
            }
          }
        }
      }
    })
    .state('merchant.mine.feedback', {
      url: '/feedback',
      pageTitle: '我要反馈',
      views: {
        '@': {
          templateUrl: './app/pages/feedback/feedback.html',
          controller: 'FeedbackCtrl',
          controllerAs: 'vm'
        }
      }
    })
    .state('merchant.mine.order', {
      url: '/order?tab',
      pageTitle: '我的订单',
      views: {
        '@': {
          templateUrl: './app/pages/order-list/order-list.html',
          controller: 'OrderListCtrl'
        }
      }
    })
    .state('merchant.mine.order.detail', {
      url: '^/order-detail?orderNo&busiId&busiType&code',
      pageTitle: '订单详情',
      resolve: {
        redirect: function ($state, $stateParams) {

          return $state.go('merchant.paymentDetail', $stateParams);
        }
      }
    })
    .state('merchant.mine.order.drawback', {
      url: '/:orderNo/drawback',
      pageTitle: '退款申请',
      views: {
        '@': {
          templateUrl: './app/pages/drawback/drawback.html',
          controller: 'DrawbackCtrl'
        }
      }
    })
    .state('merchant.mine.order.express', {
      url: '/:orderNo/express',
      pageTitle: '快递信息',
      views: {
        '@': {
          templateUrl: './app/pages/express-info/express-info.html',
          controller: 'ExpressInfoCtrl',
          controllerAs: 'vm'
        }
      }
    })
    .state('merchant.mine.address', {
      url: '/address',
      pageTitle: '地址管理',
      views: {
        '@': {
          templateUrl: './app/pages/address/address.html',
          controller: 'AddressCtrl'
        }
      }
    })
    .state('merchant.mine.setting', {
      url: '/setting?mobile',
      pageTitle: '设置',
      views: {
        '@': {
          templateUrl: './app/pages/setting/setting.html',
          controller: 'SettingCtrl'
        }
      }
    })
    .state('merchant.mine.settingPwd', {
      url: '/setting-pwd?type',
      views: {
        '@': {
          templateUrl: './app/pages/setting-pwd/setting-pwd.html',
          controller: 'SettingPwdCtrl',
          controllerAs: 'vm'
        }
      },
      resolve: {
        pageTitle: function ($stateParams, pageTitleService) {
          var title = $stateParams.type ? '设置支付密码' : '设置登录密码';
          pageTitleService.update(title);
          return title;
        }
      }
    })
    .state('merchant.mine.settingPaypwd', {
      url: '/setting-paypwd',
      pageTitle: '支付密码设置',
      views: {
        '@': {
          templateUrl: './app/pages/setting-paypwd/setting-paypwd.html',
          controller: 'SettingPaypwdCtrl',
          controllerAs: 'vm'
        }
      }
    })
    .state('merchant.mine.setting.pwdmodify', {
      url: '/pwdmodify',
      pageTitle: '修改登录密码',
      views: {
        '@': {
          templateUrl: './app/pages/pwdmodify/pwdmodify.html',
          controller: 'PwdmodifyCtrl',
          controllerAs: 'vm'
        }
      }
    })
    .state('merchant.mine.setting.paypwdmodify', {
      url: '/paypwdmodify',
      pageTitle: '修改支付密码',
      views: {
        '@': {
          templateUrl: './app/pages/paypwdmodify/paypwdmodify.html',
          controller: 'PaypwdmodifyCtrl',
          controllerAs: 'vm'
        }
      }
    })
    // 登录注册相关
    .state('merchant.login', {
      url: '/login',
      pageTitle: '登录',
      views: {
        '@': {
          templateUrl: './app/pages/login/login.html',
          controller: 'LoginCtrl',
          controllerAs: 'vm'
        }
      }
    })
    .state('merchant.findPassword', {
      url: '/find-password?login',
      pageTitle: '重置登录密码',
      views: {
        '@': {
          templateUrl: './app/pages/find-password/find-password.html',
          controller: 'FindPasswordCtrl'
        }
      },
      resolve: {
        SimpleMyInfo: function (resourcePool, $stateParams) {
          // 这里进行一个是否登录的判断,因为登录后,找回密码里调这个接口可以把手机号直接传过去无需自己再次输入,当没登录的时候,点忘记密码,
          //调这个接口那么就要返回一个空对象了.
          if ($stateParams.login) {
            return resourcePool.simpleMyInfo.get().then(function (res) {
              return res.model;
            });
          } else {
            return {};
          }

        }
      }
    })
    .state('merchant.findPaypassword', {
      url: '/find-paypassword?from',
      pageTitle: '找回支付密码',
      views: {
        '@': {
          templateUrl: './app/pages/find-paypassword/find-paypassword.html',
          controller: 'FindPaypasswordCtrl',
          controllerAs: 'vm'
        }
      },
      resolve: {
        SimpleMyInfo: function (resourcePool) {
          return resourcePool.simpleMyInfo.get().then(function (res) {
            return res.model;
          });
        }
      }
    })
    .state('merchant.register', {
      url: '/register',
      pageTitle: '注册',
      views: {
        '@': {
          templateUrl: './app/pages/register/register.html',
          controller: 'RegisterCtrl',
          controllerAs: 'vm'
        }
      }
    })

    // 我的电子券
    .state('merchant.mine.eticket', {
      url: '/eticket?tab',
      pageTitle: '我的优惠券',
      views: {
        '@': {
          templateUrl: './app/pages/my-eticket/my-eticket.html',
          controller: 'MyEticketCtrl',
          controllerAs: 'vm'
        }
      }
    })

    // 积分相关
    .state('merchant.score', {
      url: '/score',
      pageTitle: '积分商城',
      views: {
        '@': {
          templateUrl: './app/pages/score-mall/score-mall.html',
          controller: 'ScoreMallCtrl',
          controllerAs: 'vm'
        }
      },
      resolve: {
        Myscore: function (resourcePool) {
          return resourcePool.score.get().then(function (res) {
            return res.model;
          });
        }
      }
    })
    .state('merchant.score.detail', {
      url: '/detail',
      pageTitle: '我的积分',
      views: {
        '@': {
          templateUrl: './app/pages/score-detail/score-detail.html',
          controller: 'ScoreDetailCtrl',
          controllerAs: 'vm'
        }
      }
    })
    .state('merchant.score.exchange', {
      url: '/exchange',
      pageTitle: '积分兑换',
      views: {
        '@': {
          templateUrl: './app/pages/score-exchange/score-exchange.html',
          controller: 'ScoreExchangeCtrl',
          controllerAs: 'vm'
        }
      }
    })

    // 电子券相关
    .state('merchant.eticket', {
      url: '/eticket',
      pageTitle: '优惠专区',
      views: {
        '@': {
          controller: function ($state, $stateParams) {
            $state.go('merchant.activity', $stateParams);
          }
        }
      }
    })
    .state('merchant.eticket.detail', {
      url: '/:discountCode?{fromState}&{type}',
      views: {
        '@': {
          templateUrl: './app/pages/eticket-detail/eticket-detail.html',
          controller: 'EticketDetailCtrl',
          controllerAs: 'vm'
        }
      },
      resolve: {
        Eticket: function ($q, resourcePool, $stateParams, pageTitleService) {
          var type, EticketRC;
          /*
           * $stateParams现在有两个值, fromState 和 type
           * 分别表示从哪里过来 (个人中心, 短信, 积分商城, 优惠专区)
           * 以及类型（现在仅个人中心过来的有类型, 如 unpaid 待付款, unused 未使用 等）
           * 这两个参数组合起来对应不同接口 URL 以及 query 参数
           *
           * */
          switch ($stateParams.fromState) {
            case 'mine':
            case 'my-eticket': // 为了兼容老的短信
              EticketRC = resourcePool.myEticket;
              type = 1;
              pageTitleService.update('电子券详情');
              if ($stateParams.type === 'unpaid') {
                pageTitleService.update('电子券订单详情');
                type = 2;
              }
              break;

            case 'sns': // 短信发送的地址
              EticketRC = resourcePool.myEticket;
              // type = 3 表示是加密过的核销码, 方便后端处理
              type = 3;
              pageTitleService.update('电子券详情');
              break;

            case 'score':
            case 'score-mall':
              EticketRC = resourcePool.eticket;
              pageTitleService.update('电子券兑换');
              type = 0;
              break;

            default:
              pageTitleService.update('电子券详情');
              EticketRC = resourcePool.eticket;
              type = 1;
          }
          var allPromises = [
            EticketRC.get({
              discountCode: $stateParams.discountCode,
              channelId: $stateParams.discountCode,
              type: type
            })
          ];
          if (type === 0) {
            allPromises.push(
              resourcePool.score.get({
                _passLogin: true
              })
            );
          }
          return $q.all(allPromises).then(function (results) {
            /*       if (results[1]) {
             console.log('1');
             return {
             eticketData: results[0].model,
             myScore: results[1].model
             };
             } else {
             console.log('0');
             return {
             eticketData: results[0].model
             };
             }*/
            return {
              eticketData: results[0].model,
              myScore: results[1] && results[1].model
            };

          });
        }
      }
    })

    .state('merchant.eticket.refund', {
      url: '/:code/refund',
      pageTitle: '申请退款',
      views: {
        '@': {
          templateUrl: './app/pages/eticket-refund/eticket-refund.html',
          controller: 'EticketRefundCtrl',
          controllerAs: 'vm',
          resolve: {
            RefundReason: function (resourcePool) {
              return resourcePool.refundReason.query({}).then(function (res) {
                return res.collection;
              });
            },
            Eticket: function (resourcePool, $stateParams) {
              return resourcePool.myEticket.get({
                code: $stateParams.code,
                operation: 'drawback'
              }).then(function (res) {
                return res.model;
              });
            }
          }
        }
      }
    })

    // 余额相关
    .state('merchant.balance', {
      url: '/balance',
      pageTitle: '我的余额',
      views: {
        '@': {
          templateUrl: './app/pages/balance/balance.html',
          controller: 'BalanceCtrl',
          controllerAs: 'vm',
          resolve: {
            MyBalance: function (resourcePool) {
              return resourcePool.prepaidCardMineBalance.get().then(function (res) {
                return res.model;
              });
            }
          }
        }
      }
    })
    .state('merchant.inpour', {
      url: '/inpour',
      pageTitle: '余额充值',
      views: {
        '@': {
          templateUrl: './app/pages/inpour/inpour.html',
          controller: 'InpourCtrl',
          controllerAs: 'vm'
        }
      },
      resolve: {
        vipInfo: function (resourcePool) {
          return resourcePool.myVip.get().then(function (res) {
            return res.model;
          });
        },

        MyBalance: function (resourcePool) {
          return resourcePool.prepaidCardMineBalance.get().then(function (res) {
            return res.model;
          });
        }
      }
    })
    .state('merchant.inpour.detail', {
      url: '/:memberTypeId?chargeType&auth=0',
      pageTitle: '余额充值',
      views: {
        '@': {
          templateUrl: './app/pages/inpour-detail/inpour-detail.html',
          controller: 'InpourDetailCtrl',
          controllerAs: 'vm',
          resolve: {
            chargeRule: function ($stateParams, resourcePool, vipInfo, msgService) {
              var memberTypeId = $stateParams.memberTypeId;

              return resourcePool.chargeRule.new({
                memberTypeId: +memberTypeId,
                isFirstCharge: !vipInfo.hasInitial
              }).then(function (data) {
                return data.collection;
              });
            }
          }
        }
      }
    })
    .state('merchant.prepaidCard', {
      url: '/prepaid-card'
    })
    .state('merchant.wechat', {
      url: '/wechat',
      views: {
        '@': {
          templateUrl: './app/pages/wechat/wechat.html',
          controller: 'WechatCtrl',
          controllerAs: 'vm'
        }
      }
    })
    .state('merchant.prepaidCard.password', {
      url: '/password/?action',
      views: {
        '@': {
          templateUrl: './app/pages/prepaid-card/password/password.html',
          controller: 'PrepaidCardPasswordCtrl',
          controllerAs: 'vm'
        }
      }
    })

    .state('merchant.error', {
      url: '/error?type',
      pageTitle: '出错了',
      views: {
        '@': {
          templateUrl: './app/pages/error/error.html',
          controller: 'ErrorCtrl',
          controllerAs: 'vm'
        }
      }
    });
});
