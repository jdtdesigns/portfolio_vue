<template>
	<header class="row split y-center" :class="{scroll: set_scroll_class}">
		<h3 class="logo">JD Tadlock</h3>
		<nav>	
			<a href="#portfolio" class="active">Portfolio</a>
			<a href="#about">About</a>
			<a href="#contact">Contact</a>
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
		methods: {
			setScrollStyles(e) {
				var y = e.srcElement.scrollingElement.scrollTop

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
		padding: 25px 8% 14px;
		transition: opacity .8s, padding .8s, background .8s, box-shadow .8s, color .8s;
		&.scroll {
			background: #f8f8f8;
			padding: 10px 8% 16px;
			box-shadow: 0 0 13px rgba(#000, .2);
			animation: fadeIn .8s;
			.logo {
				opacity: 1;
				visibility: visible;
			}
			a {
				color: #999;
				&:after {
					background: #999;
				}
			}
		}
		.logo {
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
			&:after {
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
	}
</style>