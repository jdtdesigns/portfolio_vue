<template>
	<section id="portfolio">
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
a
		<div class="portfolio-header column y-center">
			<form class="row y-center">
				<input type="text" placeholder="Type a Category (ie. Vue or Laravel)">
				<i class="fa fa-search"></i>
			</form>
		</div>
		<project v-for="project in data" :project="project"></project>
		<div class="row x-center">
			<button class="view-more">View More</button>
		</div>
	</section>
</template>

<script>
	import Project from './Project.vue'

	export default {
		data() {
			return {
				data: [
				{
					image: 'dist/about.jpg',
					title: 'First One',
					description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed illum molestias alias, deleniti incidunt eaque perferendis impedit blanditiis excepturi earum omnis in perspiciatis praesentium saepe dolores ullam voluptates nemo id.',
					tags: ['html', 'css', 'javascript'],
					date: '1/27/17'
				},
				{
					image: 'dist/contact.jpg',
					title: 'Second One',
					description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo ut consectetur nemo aut optio enim qui quibusdam commodi perferendis laudantium. Reiciendis facere voluptatem id repudiandae fuga veniam est possimus facilis!',
					tags: ['html', 'css', 'javascript'],
					date: '1/27/17'
				},
				{
					image: 'dist/landing.png',
					title: 'Third One',
					description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus sequi, amet dolorem necessitatibus est. Asperiores omnis autem atque eveniet deleniti, sit sapiente voluptatem id ipsum quis nam quaerat facilis. Sunt!',
					tags: ['html', 'css', 'javascript'],
					date: '1/27/17'
				},
				{
					image: 'dist/about_mid.jpg',
					title: 'Forth One',
					description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente iure sit, laudantium vitae, ipsa accusamus similique perferendis incidunt nulla voluptas. Perspiciatis saepe incidunt numquam, nihil officiis dicta facilis voluptates sint.',
					tags: ['html', 'css', 'javascript'],
					date: '1/27/17'
				},
				{
					image: 'dist/about.jpg',
					title: 'Fifth One',
					description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum deleniti quod corporis veritatis quaerat, ducimus, iure in eligendi molestiae quos delectus nobis illo nihil laudantium totam, architecto, quasi alias cumque.',
					tags: ['html', 'css', 'javascript'],
					date: '1/27/17'
				}
				],
			}
		},
		methods: {
			getProjects() {
				// firebase

			}
		},
		components: {
			Project
		}	
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
			background: url(../../assets/landing.png) no-repeat;
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

	.portfolio-header {
		position: relative;
		padding: 30px 0 15px;
		&:after {
			content: '';
			position: absolute;
			bottom: -10px;
			left: 0;
			right: 0;
			margin: 0 auto;
			width: 250px;
			height: 1px;
			background: #e9e9e9;
		}
		form {
			position: relative;
			input {
				border: 1px solid #bbb;
				padding: 8px 10px 8px 35px;
				border-radius: 2px;
				min-width: 290px;
				color: #777;
			}
			.fa {
				color: #bbb;
				font-size: 1.3em;
				margin-left: 10px;
				position: absolute;
				left: 0;
				top: 7px;
			}
		}
	}

	button.view-more {
		margin: 40px 0 40px;
		background: none;
		font-size: 1.2em;
		text-transform: uppercase;
		color: #999;
		border: 1px solid #999;
		border-radius: 2px;
		padding: 7px 45px;
		cursor: pointer;
		transition: background .3s, color .3s, border .3s;
		&:hover {
			background: #bbb;
			border-color: #bbb;
			color: #fff;
		}
	}	
</style>