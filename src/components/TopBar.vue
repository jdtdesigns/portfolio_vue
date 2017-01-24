<template>
	<header class="row split y-center" 
		:class="headerClasses">
		<router-link to="/" class="logo">
			<h3>JD Tadlock</h3>
		</router-link>
		<nav>	
			<router-link to="/" active-class="active" exact>Portfolio</router-link>
			<router-link to="/about" active-class="active">About</router-link>
			<router-link to="/contact" active-class="active">Contact</router-link>
		</nav>
	</header>
</template>

<script>
	export default {
		data() {
			return {
				topBarPos: 0,
				set_scroll_class: false
			}
		},
		computed: {
			headerClasses() {
				return {
					scroll: this.set_scroll_class,
					about: this.$route.path == '/about',
					'contact-header': this.$route.path == '/contact'
				}
			}
		},
		methods: {
			setScrollStyles(e) {
				var y = e.target.scrollingElement.scrollTop

				if ( y > 60 ) 
					this.set_scroll_class = true 
				else this.set_scroll_class = false 
			}
		},
		mounted() {
			window.addEventListener('scroll', this.setScrollStyles)
		}
	}
</script>

<style lang="scss">
	@import './scss/animations';

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
				&.active {
					color: #ddd;
				}
			}
		}
		&.contact-header {
			a {
				color: #eee;
			}
		}
		&.scroll {
			background: #f8f8f8;
			transform: translate3d(0, 0, 0);
			box-shadow: 0 0 10px rgba(#000, .1);
			top: -6px;
			height: 50px;
			.logo h3 {
				opacity: 1;
				visibility: visible;
			}
			a {
				color: #999 !important;
				&:after {
					background: #999;
				}
			}
		}
		.logo h3 {
			text-transform: uppercase;
			font-family: 'Lato', sans-serif;
			font-weight: 300;
			font-size: 1.1em;
			color: #777;
			letter-spacing: .02em;
			position: relative;
			opacity: 0;
			visibility: hidden;
			transition: opacity .8s, visibility .8s;
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
		a {
			font-family: 'Lato', sans-serif;
			text-transform: uppercase;
			margin: 0 15px;
			color: #777;
			position: relative;
					transform: translate3d(0,0,0);
			&:not(.logo):after {
				content: '';
				position: absolute;
				left: 0;
				bottom: -6px;
				width: 100%;
				height: 1px;
				background: #777;
				transform-origin: top left;
				transition: transform .4s;
				transform: scaleX(0);
			}
			&.active, &:hover {
				&:after {
					transform: scaleX(1);		
				}
			}
		}
		&.contact-header a:after {
			background: #eee;
		}
		&.scroll.contact-header a:after {
			background: #999;
		}
	}
</style>