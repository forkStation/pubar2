import template from './numberPick.jade';
import './numberPick.scss';

export default function () {
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      number:"=",
      getNumber:'&',
      id:"="
    },
    template:template(),
    controller:NumberPickController,
    controllerAs: 'vm'
  }
}


class NumberPickController {
  constructor($scope) {
    "ngInject";
    this.name = 'numberPick';
    this.number=$scope.number;
    this.scope = $scope;
    this._check();
  }

  _check() {
    this.needShowReduce = this.number !== 0;
  }

  add() {
    this.number++;
    this._check();
    console.log(this.scope.id)
  }

  reduce() {
    this.number--;
    this._check();
  }
}

