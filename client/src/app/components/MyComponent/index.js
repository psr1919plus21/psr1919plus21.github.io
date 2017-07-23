export default class MyClass {
  constructor() {
      particlesJS.load('particles-js', 'app/static/js/particles.json', function() {
        console.log('callback - particles.js config loaded');
      });
  }

}
