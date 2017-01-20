import Vue from 'vue'
import App from './App.vue'
import _ from 'Lodash'

Vue.use(_)

new Vue({
  el: '#app',
  render: h => h(App)
})
