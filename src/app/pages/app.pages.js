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
    morectrl.name//@register
]);
