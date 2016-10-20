/**
 * Created by wj on 2016/5/26.
 */
import { angular, ionic } from 'library'
import productList from './productList/productList'
import index from './index/index'
import barDetail from './barDetail/barDetail'
import groupDetail from './groupDetail/groupDetail'
import search from './search/search'
import location from './location/location'
import chat from './chat/chat'
import member from './member/member'
import setting from './setting/setting'
import resetpwd from './resetpwd/resetpwd'
import pocket from './pocket/pocket'
import recharge from './recharge/recharge'
import takeCash from './takeCash/takeCash'
import friend from './friend/friend'
import collect from './collect/collect'
import myGroup from './myGroup/myGroup'
import chatList from './chatList/chatList'
import fans from './fans/fans'
import member_view from './member_view/member_view'
import member_edit from './member_edit/member_edit'
import edittxt from './edittxt/edittxt'
import morectrl from './morectrl/morectrl'
import create from './create/create'
import apply from './apply/apply'
import addFriend from './addFriend/addFriend'
import onme from './onme/onme'
import onme_result from './onme_result/onme_result'
import onme_detail from './onme_detail/onme_detail'
import couponList from './couponList/couponList'
import groupOrderList from './groupOrderList/groupOrderList'
import app from './app/app'
import phoneLogin from './phoneLogin/phoneLogin'
import phoneSet from './phoneSet/phoneSet'
import longText from './longText/longText'
import avatar from './avatar/avatar'
import message from './message/message'
import productInfo from './productInfo/productInfo'
import createOrder from './createOrder/createOrder'
import messageMemberView from './messageMemberView/messageMemberView'
import accountList from './accountList/accountList'
import addAccount from './addAccount/addAccount'
import inviteDetail from './inviteDetail/inviteDetail'
import successInfo from './successInfo/successInfo'
import payRedirect from './payRedirect/payRedirect'
import activeBars from './activeBars/activeBars'
import groupList from './groupList/groupList'
import pufList from './pufList/pufList'
import chatGroup from './chatGroup/chatGroup'
import chatGroupList from './chatGroupList/chatGroupList'
import order from './order/order'
import orderDetail from './orderDetail/orderDetail'
//@import

export default angular.module('app.pages', [
    productList.name,
    index.name,
    barDetail.name,
    groupDetail.name,
    search.name,
    location.name,
    chat.name,
    member.name,
    setting.name,
    resetpwd.name,
    pocket.name,
    recharge.name,
    takeCash.name,
    friend.name,
    collect.name,
    myGroup.name,
    chatList.name,
    fans.name,
    member_view.name,
    member_edit.name,
    edittxt.name,
    morectrl.name,
    create.name,
    apply.name,
    addFriend.name,
    onme.name,
    onme_result.name,
    onme_detail.name,
    couponList.name,
    groupOrderList.name,
    app.name,
    phoneLogin.name,
    phoneSet.name,
    longText.name,
    avatar.name,
    message.name,
    productInfo.name,
    createOrder.name,
    messageMemberView.name,
    accountList.name,
    addAccount.name,
    inviteDetail.name,
    successInfo.name,
    payRedirect.name,
    activeBars.name,
    groupList.name,
    pufList.name,
    chatGroup.name,
    chatGroupList.name,
    order.name,
    orderDetail.name//@register
]);
