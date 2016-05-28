/**
 * Created by wj on 2016/5/26.
 */
import { angular, ionic } from 'library'
import home from './home/home'
import about from './about/about'
import productList from './productList/productList'
//@import

export default angular.module('app.pages', [
    home.name,
    about.name,
    productList.name//@register
]);
