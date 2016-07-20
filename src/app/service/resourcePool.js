/**
 * Created by wj on 2016/6/7.
 * happy everyday!
 */
'use strict'
// 建议接口添加顺序严格按照rap的顺序来
/**
 * 资源池 管理所有的接口
 * @param resource
 * @returns {{addBarFriend: *, getBarInfo: *, getBarList: *, getBarFriendList: *, getCities: *, getDrinkInfo: *, getDrinkList: *, getDrinkCate: *, getSmsCode: *, register: *, login: *, postOrder: *, getOrderList: *, getOrderPayList: *, getOrderDetail: *, getPartyUserInfo: *, getPartyInfo: *, getPartyList: *}}
 */
export default function(resource){
    'ngInject'
    return {
        // bar
        'addBarFriend':resource.bar('barfriend_add'),
        'getBarInfo':resource.bar('bar_info'),
        'getBarList':resource.bar('bar_list'),
        'getBarFriendList':resource.bar('barfriend_list'),
        'getBarFollow':resource.bar('bar_follow'),
        'cancelBarFollow':resource.bar('up_bar_follow'),
        'addBarFollow':resource.bar('add_bar_follow'),
        // city
        'getCities':resource.city('get_city'),
        // drink
        'getDrinkInfo':resource.drink('drink_info'),
        'getDrinkList':resource.drink('get_drink_list'),
        'getDrinkCate':resource.drink('get_drink_cate'),
        // meb
        'getSmsCode':resource.Meb('regsms'),
        'register':resource.Meb('reg'),
        'login':resource.Meb('login'),
        // order

        'getConfirmOrderInfo':resource.order('order_paylist'),
        'getOrderList':resource.order('order_list'),
        'getOrderPayList':resource.order('order_paylist'),
        'getOrderDetail':resource.order('order_info'),

        // party
        'createNewOrder':resource.party('party_drink'),
        'getPartyUser':resource.party('get_party_user'),
        'getPartyInfo':resource.party('get_party_info'),
        'getPartyList':resource.party('party_list'),
        'createParty':resource.party('create_party'),
        'getMyCreateParty':resource.party('my_add_party'),
        'getMyJoinParty':resource.party('my_join_party'),
        'joinParty':resource.party('join_party'),
        'applyParty':resource.party('commit_party'),
        'agreeParty':resource.party('consent_party'),
        'rejectParty':resource.party('reject_party'),
        //weixin
        'wxLogin':resource.wx('wx_login'),
        'wxBind':resource.wx('bind'),

        //friend
        'rejectFriend':resource.friend('un_friend'),
        'friendFollow':resource.friend('friend_follow'),
        'addFriend':resource.friend('add_friendreg'),
        'getFriendList':resource.friend('get_friends'),
        'getFriendReg':resource.friend('get_friendreg_list'),
        'getBlackFriend':resource.friend('black_friend'),
        'receiveFreind':resource.friend('add_friend'),
        'getFollowList':resource.friend('friend_list'),

        //user
        'getUserInfo':resource.user('user_info'),
        'userEdit':resource.user('user_edit'),
        'uploadHeadIcon':resource.user('upload_headIcon'),
        //msg
        'getMsgList':resource.msg('msg_list'),
        'sendMsg':resource.msg('msg_send'),
        'getMsgCount':resource.msg('msg_count'),

        //msgChat
        'getMsgRecord':resource.msgchat('record'),
        //wallet
        'getWalletInfo':resource.wallet('wallet_info'),
        'getWalletList':resource.wallet('wallet_list'),
        'addWalletAccount':resource.wallet('wallet_account'),
        'getAccountList':resource.wallet('account_list'),
        'setDefaultAccount':resource.wallet('default_acc'),
        'getDefaultAccount':resource.wallet('default_acc'),
        'getDrawInfo':resource.wallet('withdraw_money'),


        //支付
        'setOrderPay':resource.pay('do_pay'),

        //微信支付
        'recharge':resource.wpay('recharge'),

        //聊天webim
        'getChatter':resource.chat('chater'),

        //根据授权信息返回的结果,取得关注人的微信资料
        'getTokenUser':resource.getToken('out_token'),

        //
        'searchUser':resource.search('find_friend')
    }
}