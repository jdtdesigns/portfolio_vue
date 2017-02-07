<template>
	<footer>
		<div class="footer-top column">
			<div class="row">
				<h1 class="footer__header">Building applications is my thing.</h1>
			</div>
			<div class="row">
				<a href="https://github.com/jdtdesigns" class="row y-center" target="_blank"><i class="fa fa-github"></i>github.com/jdtdesigns</a>
			</div>
			<div class="row">
				<a href="mailto:jd.tadlock@yahoo.com" class="row y-center"><i class="fa fa-envelope-o"></i>jd.tadlock@yahoo.com</a>
			</div>
		</div>
		<div class="footer-bottom row split y-center">
			<span>Copyright &copy; <span>{{ year }}</span> JD Tadlock</span>
			<div class="footer-info column">
				<span>Development by JD Tadlock</span>
				<p>Special thanks to <a href="http://borischantel.com/" target="_blank">Boris Chantel</a> for joining in the design</p>
			</div>
		</div>
	</footer>
</template>

<script>
	export default {
		computed: {
			year() {
				const date = new Date()
				return date.getFullYear()
			}
		}
	}
</script>

<style lang="scss">
	@import './scss/mixins';

	footer {
		.footer-top {
			padding: 100px 10%;
			background: rgba(0, 0, 0, .05);
			color: #444;
			@include size(medium) {
				padding: 70px 5%;
			}
			@include size(small) {
				padding: 50px 5%;
			}
			.footer__header {
				font-family: 'Lora', serif;
				font-weight: 400;
				font-style: italic; 
				margin-bottom: 60px;
				position: relative;
				@include size(medium) {
					font-size: 1.5em;
				}
				@include size(small) {
					font-size: 1.2em;
					margin-bottom: 40px;
				}
				&:after {
					content: '';
					position: absolute;
					bottom: -25px;
					left: 0;
					width: 200px;
					height: 1px;
					background: #777;
				}
			}
			
			a {
				font-size: 1.2em;
				color: #333;
				font-family: 'Lato', sans-serif;
				@include size(medium) {
					font-size: 1em;
				}
				&:not(:last-child) {
					margin-bottom: 15px;
				}
				.fa {
					color: #707070;
					font-size: 2.2em;
					width: 65px;
				}
			}
		}
		.footer-bottom {
			background: #eae6e1;
			padding: 20px 10%;
			font-family: 'Lato', sans-serif;
			font-weight: 300;
			text-transform: uppercase;
			font-size: .9em;
			color: #7a7a7a;
			@include size(medium) {
				font-size: .8em;
				padding: 15px 5%;
			}
			@media (max-width: 700px) {
				flex-direction: column;
				text-align: center;
				span {
					margin-bottom: 10px;
				}
			}
			span:first-child {
				@include size(medium) {
					// font-size: .9em;
				}
			}
			.footer-info {
				span:first-child {
					margin-bottom: 4px;
					@include size(medium) {
						// font-size: .9em;
					}
				}
				a {
					color: #999;
				}
			}
		}
	}
</style>