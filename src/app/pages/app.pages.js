/**
 * Created by wj on 2016/5/26.
 */
import { angular, ionic } from 'library'
import home from './home/home'
import about from './about/about'
import productList from './productList/productList'
import index from './index/index'
import barDetail from './barDetail/barDetail'
import groupDetail from './groupDetail/groupDetail'
import search from './search/search'
import location from './location/location'
//@import

export default angular.module('app.pages', [
    home.name,
    about.name,
    productList.name,
    index.name,
    barDetail.name,
    groupDetail.name,
    search.name,
    location.name
]);
