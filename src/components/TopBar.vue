<template>
	<div class="top-bar">
		<header class="row split y-center" 
			:class="headerClasses">
			<router-link to="/" class="logo">
				<h3>JD Tadlock</h3>
			</router-link>
			<i class="fa fa-navicon"
				@click="show_mobile_nav = !show_mobile_nav"></i>
			<nav class="row">	
				<router-link to="/" active-class="active" exact>Portfolio</router-link>
				<router-link to="/about" active-class="active">About</router-link>
				<router-link to="/contact" active-class="active">Contact</router-link>
				<router-link 
					to="/admin" 
					active-class="active"
					v-if="is_admin">Admin</router-link>
			</nav>
		</header>
		<div class="mobile-nav column y-center"
			:class="{show: show_mobile_nav}">
			<i class="fa fa-times-circle"
				@click="show_mobile_nav = false"></i>
			<div class="nav-logo column y-center">
				<h3>JD Tadlock</h3>
				<h4>Fullstack Developer</h4>
			</div>
			<router-link to="/" active-class="active" exact>Portfolio</router-link>
			<router-link to="/about" active-class="active">About</router-link>
			<router-link to="/contact" active-class="active">Contact</router-link>
			<router-link 
				to="/admin" 
				active-class="active"
				v-if="is_admin">Admin</router-link>
		</div>
	</div>
</template>

<script>
	import { bus } from '../main'

	export default {
		data() {
			return {
				topBarPos: 0,
				set_scroll_class: false,
				is_admin: false,
				show_mobile_nav: false
			}
		},
		computed: {
			headerClasses() {
				return {
					scroll: this.set_scroll_class,
					about: this.$route.path == '/about' || this.$route.path == '/admin',
					'contact-header': this.$route.path == '/contact'
				}
			}
		},
		methods: {
			setScrollStyles(e) {
				var y = e.target.scrollingElement.scrollTop

				if ( y > 30 ) 
					this.set_scroll_class = true 
				else this.set_scroll_class = false 
			},
			closeMobileNav() {
				this.show_mobile_nav = false
			}
		},
		mounted() {
			window.addEventListener('scroll', this.setScrollStyles)
		},
		created() {
			const auth = firebase.auth()
			auth.onAuthStateChanged(user => {
				if ( user ) {
					const id = user.uid

					firebase.database().ref('/admins/' + id)
					.once('value').then(data => {
						if ( data.val() )
							this.is_admin = true
					})
				}
			})

			bus.$on('route_changed', () => this.show_mobile_nav = false)
			window.onresize = () => this.show_mobile_nav = false
		}
	}
</script>

<style lang="scss">
	@import './scss/animations';
	@import './scss/mixins';

	header {
		position: fixed;
		top:0;
		left: 0;
		z-index: 500;
		width: 100%;
		padding: 0 8%;
		height: 60px;
		transition: all .8s;
		user-select: none;
		&.about {
			.logo h3 {
				color: #aaa;
			}
			a {
				color: #aaa;
				&.active, &:hover {
					color: #ddd;
					&:after {
						background: #fff;
					}
				}

			}
			.fa-navicon {
				color: #ddd;
			}
		}
		&.contact-header {
			a {
				color: #dadada;
				&.active, &:hover {
					color: #fff;
					&:after {
						background: #fff;
					}
				}
			}
			.fa-navicon {
				color: #ddd;
			}
		}
		&.scroll {
			background: #f8f8f8;
			transform: translate3d(0, 0, 0);
			box-shadow: 0 0 10px rgba(#000, .1);
			height: 50px;
			@media (min-width: 768px) {
				top: -6px;
				a {
					color: #999 !important;
					&:after {
						background: #999 !important;
					}
				}
			}
			.logo {
				opacity: 1;
				visibility: visible;
			}
			.fa-navicon {
				color: #444;
			}
		}
		.fa-navicon {
			display: none;
			font-size: 1.3em;
			color: #444;
			cursor: pointer;
			user-select: none;
			@include size(medium) {
				display: block;
			}
		}
		.logo {
			opacity: 0;
			visibility: hidden;
			transition: opacity .8s, visibility .8s;
			h3 {
				text-transform: uppercase;
				font-family: 'Lato', sans-serif;
				font-weight: 300;
				font-size: 1.1em;
				color: #777;
				letter-spacing: .02em;
				position: relative;
				&:after {
					content: '';
					position: absolute;
					bottom: -3px;
					left: 0;
					width: 100%;
					height: 1px;
					background: #999;
				}
			}
		}
		nav {
			&.row {
				@include size(medium) {
					display: none;
				}
			}
			a {
				@include nav_link;
			}
		}		
		&.contact-header a:after {
			background: #eee;
		}
		&.scroll.contact-header a:after {
			background: #999;
		}
	}
	.mobile-nav {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 600;
		padding: 80px 0 0;
		width: 100%;
		height: 100%;
		flex-direction: column;
		align-items: center;
		background: rgba(#333, .99);
		opacity: 0;
		visibility: hidden;
		transition: opacity .4s, visibility .4s;
		user-select: none;
		&.show {
			opacity: 1;
			visibility: visible;
		}
		.fa-times-circle {
			display: none;
			position: absolute;
			right: 35px;
			top: 20px;
			font-size: 1.5em;
			color: #ddd;
			cursor: pointer;
			@include size(medium) {
				display: block;
			}
		}
		.nav-logo {
			font-family: 'Lato', sans-serif;
			margin-bottom: 30px;
			h3, h4 {
				font-weight: 300;					
			}
			h3 {
				font-size: 1.7em;
				color: #dadada;
				position: relative;
				margin-bottom: 5px;
				&:after {
					content: '';
					position: absolute;
					bottom: -2px;
					left: 0;
					width: 100%;
					height: 2px;
					background: #999;
				}
			}
			h4 {
				color: #aaa;
			}
		}
		a {
			@include nav_link;
		}
	}
</style>