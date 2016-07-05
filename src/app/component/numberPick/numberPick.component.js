import template from './numberPick.jade';
import './numberPick.scss';

export default function () {
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      number:"=",
      getNumber:'&',
      id:"=",
      barid:'='
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
    let barProduct = t.storedb.key('product:'+t.scope.barid);

    if(barProduct.find()){
      console.log(barProduct.find({'productId':productId}));
      if(barProduct.find({'productId':productId})){
        barProduct.update({'num':t.number})
      }else{
        barProduct.insert({'productId':productId,'num':t.number});
      }
    }else{
      t.storedb.key('product:'+t.scope.barid).insert({'productId':productId,'num':t.number});
    }
  }
  add() {
    this.number++;
    this._check();
    this.setLocal(this.scope.id);
  }

  reduce() {
    this.number--;
    this._check();
    this.setLocal(this.scope.id);
  }
}

