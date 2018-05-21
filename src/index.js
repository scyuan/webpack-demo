
import Vue from 'vue';
import App from './App.vue';

const greeter = require('../Greeter.js');
document.querySelector("#app").appendChild(greeter());

new Vue({
  el: '#app',
  
  render: h => h(App)
})