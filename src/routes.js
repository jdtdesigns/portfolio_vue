import Portfolio from './components/portfolio/PortFolio.vue'
import About from './components/About.vue'
import Contact from './components/Contact.vue'
import Admin from './components/admin/Admin.vue'
import Login from './components/admin/Login.vue'

export const routes = [
	{ path: '/', name: 'portfolio', component: Portfolio },
	{ path: '/about', name: 'about', component: About },
	{ path: '/contact', name: 'contact', component: Contact },
	{ path: '/admin', name: 'admin', component: Admin,
		beforeEnter: (to, from, next) => {
			const auth = firebase.auth()

			auth.onAuthStateChanged(user => {
				if ( user ) {
					const id = user.uid

					firebase.database().ref('/admins/' + id)
					.once('value').then(data => {
						if ( data.val() )
							next()
						else next('/login')
					})
				} else next('/login')
			})
		} },
	{ path: '/login', name: 'login', component: Login }
]