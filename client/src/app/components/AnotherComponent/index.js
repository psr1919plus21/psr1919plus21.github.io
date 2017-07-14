import MyComponent from '../MyComponent';

export default class AnotheComponent extends MyComponent {
  constructor() {
    super();
    this._bar = 'baz';
  }

  get bar() {
    return this._bar;
  }

  set bar(val) {
    this._bar = val;
    return this._bar;
  }

}
