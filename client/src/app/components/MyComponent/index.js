export default class MyClass {
  constructor() {
    this._getCounter = 0;
    this._setCounter = 0;
    this._foo = 'bar';
  }

  get foo() {
    return this._foo;

  }

  set foo(val) {
    this._foo = val;
    return this._foo;
  }
}
console.log($);
