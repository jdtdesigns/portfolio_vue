<template>
	<div class="landing column y-center split">
		<div class="landing-text column y-center">
			<h1 class="landing__header">JD Tadlock</h1>
			<h2 class="landing__sub-header">Fullstack Developer</h2>
			<div class="landing-featured row">
				<span>Strategy</span>
				<span>Testing</span>
				<span>Development</span>
			</div>
			<p class="landing__about">I'm passionate about my work. Development and design bring joy to my life and I bring that joy and my passion into every job I take on.</p>
		</div>
		<div class="landing__img">
			<div class="scroll-icon column y-center">
				<i class="fa fa-television" aria-hidden="true"></i>
				<span class="scroll-icon__text">scroll down</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss">
	.landing {
		background: #ebeae8;
		min-height: 100vh;
		color: #444;
		&-text {
			padding-top: 13vh;
		}
		&__header, &__sub-header {
			position: relative;
			&:after {
				content: '';
				position: absolute;
				bottom: -4px;
				left: 0;
				height: 4px;
				width: 100%;
				background: #444;
			}
		}
		&__header {
			font-family: 'Lato', sans-serif;
			text-transform: uppercase; 
			font-weight: 900;
			font-size: 4em;
			margin-bottom: 10px;
		}
		&__sub-header {
			font-family: 'Lora', serif;
			font-weight: 400;
			font-size: 2.7em;
			font-style: italic;
			margin-bottom: 17px;
			&:after {
				bottom: -8px;
			}
		}
		&-featured {
			font-family: 'Lato', sans-serif;
			text-transform: uppercase;
			font-weight: 300;
			span {
				margin: 0 14px;
				position: relative;
				color: #777;
				&:not(:last-child) {
					&:after {
						content: '';
						position: absolute;
						right: -15px;
						top: 2px;
						height: 100%;
						width: 1px;
						background: #999;
					}
				}
			}
		}
		&__about {
			max-width: 480px;
			text-align: center;
			margin-top: 20px;
			line-height: 1.8;
			font-family: 'Lato', sans-serif;
			font-size: .92em;
		}
		&__img {
			background: url(../assets/landing.png) no-repeat;
			background-size: contain;
			background-position: center bottom;
			height: 49vh;
			width: 100%;
			position: relative;
			right: -50px;
			.scroll-icon {
				position: absolute;
				cursor: pointer;
				bottom: 20px;
				left: -100px;
				right: 0;
				&:hover {
					.fa, .scroll-icon__text {
						opacity: .9;
					}
				}
				.fa, &__text {
					transition: opacity .3s;
				}
				.fa {
					color: #888;
					font-size: 1.1em;
					margin-bottom: 5px;
				}
				&__text {
					color: #5e5e5e;
					font-family: 'Lato', sans-serif;
					font-size: .93em;
				}
			}
		}
	}
</style>
