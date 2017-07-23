(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _AnotherComponent = require('./components/AnotherComponent');

var _AnotherComponent2 = _interopRequireDefault(_AnotherComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var anothrerComponentInstance = new _AnotherComponent2.default();

console.log('another page');
console.log(anothrerComponentInstance.bar);

},{"./components/AnotherComponent":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MyComponent2 = require('../MyComponent');

var _MyComponent3 = _interopRequireDefault(_MyComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnotheComponent = function (_MyComponent) {
  _inherits(AnotheComponent, _MyComponent);

  function AnotheComponent() {
    _classCallCheck(this, AnotheComponent);

    var _this = _possibleConstructorReturn(this, (AnotheComponent.__proto__ || Object.getPrototypeOf(AnotheComponent)).call(this));

    _this._bar = 'baz';
    return _this;
  }

  _createClass(AnotheComponent, [{
    key: 'bar',
    get: function get() {
      return this._bar;
    },
    set: function set(val) {
      this._bar = val;
      return this._bar;
    }
  }]);

  return AnotheComponent;
}(_MyComponent3.default);

exports.default = AnotheComponent;

},{"../MyComponent":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MyClass = function MyClass() {
  _classCallCheck(this, MyClass);

  particlesJS.load('particles-js', 'app/static/js/particles.json', function () {
    console.log('callback - particles.js config loaded');
  });
};

exports.default = MyClass;

},{}]},{},[1]);
