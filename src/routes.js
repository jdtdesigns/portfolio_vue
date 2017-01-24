import Portfolio from './components/portfolio/PortFolio.vue'
import About from './components/About.vue'
import Contact from './components/Contact.vue'
import Admin from './components/admin/Admin.vue'

export const routes = [
	{ path: '', name: 'portfolio', component: Portfolio },
	{ path: '/about', name: 'about', component: About },
	{ path: '/contact', name: 'contact', component: Contact },
	{ path: '/admin', name: 'admin', component: Admin }
]