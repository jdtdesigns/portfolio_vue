<template>
	<div id="about">
		<div class="landing about column">
			<div class="landing-text column">
				<div class="row">
					<h1 class="landing__header">About</h1>
				</div>
				<div class="row">
					<h2 class="landing__sub-header">me</h2>
				</div>
			</div>
		</div>

		<div class="story">
			<h4 class="story__header">My Story</h4>
			<h2 class="story__main-header">Development isn’t a job it is a Lifestyle.</h2>
			<div class="story-text row">
				<div class="column">
					<p>I'm a web developer and graphic designer living in Marietta, Georgia, USA. I spend my days coding, drinking coffee and enjoying life with my beautiful wife. My goal is to bring a creative yet awesome user experience to any project I work on. 
					</p>
					<p>
						I have my hands in many different areas of development including PHP, HTML, CSS, JAVASCRIPT and a wide variety of frameworks like Laravel, Slim, Angular, Vue, and React. I also work quite often in WordPress creating themes and 
					</p>
				</div>
				<div class="column">
					<p>plugins. I have worked extremely hard building my skill set to the level it is now, and continue to strive to learn more every day.  
					</p>
					<p>My work is my passion and I put my heart into every project I work on. If you're interested in contacting me, I'm currently available for freelance work.</p>
				</div>
			</div>
		</div>

		<div class="code column y-center">
			<h1 class="code__header">Code the world</h1>
		</div>
	</div>
</template>

<script>
	
</script>

<style lang="scss">
	.landing.about {
		background: url(../assets/about.jpg) no-repeat;
		background-size: cover;
		background-position: top center;
		.landing-text {
			padding: 20vh 8% 0;
			color: #ddd;
		}
		.landing__header, .landing__sub-header {
			&:after {
				background: #ddd;
			}
		}
		.landing__header {
			&:after {
				height: 7px;
				bottom: -7px;
			}
		}
	}

	.story {
		padding: 100px 10%;
		color: #444;
		&__header {
			font-family: 'Lato', sans-serif;
			text-transform: uppercase; 
			margin-bottom: 10px;
		}
		&__main-header {
			font-family: 'Lora', serif;
			font-weight: 400;
			font-style: italic;
			color: #000;
			margin-bottom: 15px;
		}
		&-text {
			& > .column {
				flex: 1;
				&:first-child {
					margin-right: 35px;
				}
			}
			p {
				line-height: 1.7;
				margin-bottom: 10px;
				font-family: 'Lato', sans-serif;
				font-size: .96em;
			}
		}
	}

	.code {
		min-height: 100vh;
		background: url(../assets/about_mid.jpg) no-repeat;
		background-size: cover;
		background-position: top center;
		padding-top: 15vh;
		&__header {
			font-family: 'Lora', serif;
			font-style: italic;
			font-weight: 400;
			font-size: 3.3em;
			position: relative;
			color: #fff;
			&:after {
				content: '';
				position: absolute;
				bottom: -10px;
				left: 0;
				width: 100%;
				height: 4px;
				background: #fff;
			}
		}
	}
</style>