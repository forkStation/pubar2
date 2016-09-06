import tpl from './search.jade'
import './search.scss'
import { angular, ionic } from 'library'

export default angular.module('search',[ionic])
    .config(function ($stateProvider) {
        "ngInject"
        $stateProvider
            .state('search', {
                url: '/search',
                controllerAs: 'vm',
                controller: SearchController,
                template: tpl()
            })
    });


class SearchController {
    constructor (resourcePool,application,$ionicScrollDelegate) {
        "ngInject"
        this.name = 'search';
        this.application = application;
        this.resourcePool = resourcePool;
        this.headHost = application.headHost;
        this.imgHost = application.imgHost;
        this.form = {
            word:''
        };

        this.init_show = true;
        this.scrollDelegate = $ionicScrollDelegate;

    }

    search(){
        let _this = this;
        let resourcePool = _this.resourcePool;
        this.init_show = false;
        resourcePool.searchAll.request(_this.form).then(res=>{
            _this.resultBars = res.data.info.bar;
            _this.resultUsers = res.data.info.user;
            _this.resultParties = res.data.info.party;
            _this.scrollDelegate.$getByHandle('searchScroll').resize();
        })
    }
    goBack(){
        window.history.go(-1)
    }
}
