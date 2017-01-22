import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import _ from 'Lodash'


Vue.use(VueRouter)
Vue.use(_)

const router = new VueRouter({
	routes,
	mode: 'history'
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
