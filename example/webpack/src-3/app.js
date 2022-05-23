
import Vue from 'vue'
import Index from './index.vue'
console.log(Index)
window.Vue = Vue

new Vue({
  render: h => h(Index)
}).$mount('#app')

const lib = require('./lib')

lib.log('hello, world!')

console.log(new Date())
