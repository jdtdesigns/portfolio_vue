import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import _ from 'Lodash'
import VueSweetAlert from 'vue-sweetalert'

Vue.use(VueRouter)
Vue.use(_)
Vue.use(VueSweetAlert)

export const bus = new Vue({
	methods: {
		editProject(project) {
			this.project = project
			this.$emit('edit_project')
		},
		setAdmin(state) {
			this.$emit('is_admin', state)
		}
	}
})

const router = new VueRouter({
	routes,
	mode: 'history',
	scrollBehavior (to, from, savedPosition) {
     return { x: 0, y: 0 }
 	}
})

router.beforeEach((to, from, next) => {
	bus.$emit('route_changed')
	next()
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
