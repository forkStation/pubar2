import template from './numberPick.jade';
import './numberPick.scss';

export default function () {
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      number:"=",
      onState:'&',
      id:"=",
      barid:'=',
      name:'=',
      price:'='
    },
    template:template(),
    controller:NumberPickController,
    controllerAs: 'vm'
  }
}


class NumberPickController {
  constructor($scope,storedb) {
    "ngInject";
    this.name = 'numberPick';
    this.number=$scope.number;
    this.scope = $scope;
    this.barid=$scope.barid;
    this.storedb = storedb;

    this._check();
  }

  _check(productId) {
    this.needShowReduce = this.number !== 0;

  }

  setLocal(productId){

    let t = this;
    //根据酒吧id查找本地存储数据

    let scope = t.scope;
    let storage = window.localStorage;

    let currentBar = 'bar'+scope.barid;

    let currentBarStorage = storage.getItem(currentBar); //获取当前酒吧内的本地数据

    if(!currentBarStorage){  //如果获取不到数据的话,在当前酒吧新增一条本地数据

      var data = [{productId:productId,num:t.number,name:scope.name,price:scope.price}];
      storage.setItem(currentBar,JSON.stringify(data));

    }else{

      //拿到当前酒吧的json数据解析
      var barItems = JSON.parse(storage.getItem(currentBar));

      var tempArray = [];
      for(var i =0;i<barItems.length;i++){ //查看当前操作的商品是否已经存在了本地中,
        tempArray.push(barItems[i]['productId']);

      }
      if(tempArray.indexOf(productId)>=0){
        for(var i =0;i<barItems.length;i++){

          if(productId == barItems[i]['productId']){
            barItems[i]['num'] = t.number;     // 如果已经存在了直接修改数量
          }
          if(barItems[i].num<=0){
            barItems.splice(i,1);
          }
        }
      }else{
        barItems.push({        //如果不存在,则在当前酒吧内的本地数据里新增一条记录
          productId:productId,
          num:t.number,
          name:scope.name,
          price:scope.price
        })
      }
      storage.removeItem(currentBar);
      storage.setItem(currentBar,JSON.stringify(barItems));
      scope.onState();
    }

  }
  add() {
    this.number++;
    console.log(this.number);
    this._check();
    this.setLocal(this.scope.id);
  }

  reduce() {
    this.number--;
    this._check();
    this.setLocal(this.scope.id);
  }
}

