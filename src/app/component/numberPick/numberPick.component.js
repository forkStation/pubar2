import template from './numberPick.jade';
import './numberPick.scss';

let numberPickComponent = {
  restrict: 'E',
  bindings: {
    number:"="
  },
  template:template(),
  NumberPickController,
  controllerAs: 'vm'
};

export default numberPickComponent;

class NumberPickController {
  constructor() {
    "ngInject";
  }

  $onInit() {
    //此函数用于初始化数据
    this.name = 'numberPick';
    this.number = this.number ? this.number : 0;
    this._check();
  }

  _check() {
    this.needShowReduce = this.number !== 0;
  }

  add() {
    this.number++;
    this._check();
  }

  reduce() {
    this.number--;
    this._check();
  }

  $onChanges(changesObj) {
    //此函数会在this上绑定的值发生改变时调用
  }

  $onDestory() {
    //当前控制器的scope被销毁时调用

  }

  $postLink() {
    //非常重要的函数，所有对dom的操作都应该放在这里
  }
}