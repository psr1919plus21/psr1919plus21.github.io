import MyClass from './components/MyComponent';

console.log('main page');
console.log($);

let myInstance = new MyClass;
myInstance.foo = 'ololo';
console.log(myInstance.foo);
