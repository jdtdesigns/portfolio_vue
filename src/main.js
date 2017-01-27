import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import _ from 'Lodash'

Vue.use(VueRouter)
Vue.use(_)

export const bus = new Vue({
	methods: {
		toggleCreateModal() {
			// this.$emit('toggle_create_modal')
		},
		setAdmin(state) {
			console.log(state)
			this.$emit('is_admin', state)
		}
	}
})

const router = new VueRouter({
	routes,
	scrollBehavior (to, from, savedPosition) {
     return { x: 0, y: 0 }
 	},
	mode: 'history'
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
