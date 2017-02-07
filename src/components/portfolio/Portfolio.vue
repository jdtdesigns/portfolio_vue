<template>
	<section id="portfolio">
		<div id="landing" class="landing column y-center split"
			:style="{'min-height': window_height}">
			<div class="landing-text column y-center">
				<h1 class="landing__header">JD Tadlock</h1>
				<!-- {{ base_height }}
				{{ window_height }} -->
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

		<div class="portfolio-header column y-center">
			<div class="filter row y-center">
				<input type="text" placeholder="Type a Category (ie. Vue or Laravel)"
					v-model="filter"
					@keyup="filterProjects">
				<i class="fa fa-search"></i>
			</div>
		</div>
			<div class="no-results row x-center" v-if="no_filter_results">
				<h2>Sorry, No Results Found.</h2>
			</div>
			<project v-for="(project, i) in filters.length ? filters : projects.length ? projects : pages[0]" 
				:project="project"
				:style="{animation: 'fadeIn .7s .' + i * 300 + 's forwards'}"
				v-if="!no_filter_results"></project>
		<div class="view-more-wrap row x-center">
			<button class="view-more"
				@click="getMore"
				v-if="view_more_button">View More</button>
		</div>
	</section>
</template>

<script>
	import Project from './Project.vue'

	export default {
		data() {
			return {
				data: [],
				filter: '',
				filters: [],
				no_filter_results: false,
				projects: [],
				next_page: 1,
				view_more_button: true
			}
		},
		computed: {
			sorted() {
				return _.orderBy(this.data, ['date_added'], ['desc'])
			},
			pages() {
				return _.chunk(this.sorted, 4)
			},
			window_height() {
				return window.innerWidth < 768 ? window.innerHeight + 'px' : '100vh'
			}
		},
		methods: {
			getProjects() {
				const db = firebase.database(),
							projects = db.ref('/projects'),
							storage = firebase.storage(),
							count = 0

				projects.on('child_added', project => {
					const sub_images = []

					project = project.val()

					_.map(project.images, (ref, i)  => {
						storage.ref(ref).getDownloadURL()
						.then(url => {
							if ( url.match(/(main)/) )
								project.main_image = url
							else sub_images.push(url)	

							if ( i === project.images.length - 1 )
								this.data.push(project)
								if ( this.data.length < 5 ) this.view_more_button = false
						})
					})
				})

			},

			filterProjects() {
				const filter = list => {
					_.map(list, project => {
						_.map(project.tags, tag => {
							if ( tag.match(this.filter) )
								this.filters.push(project)
							else this.no_filter_results = true
						})
					})						
				}

				clearTimeout(this.runFilter)
				this.runFilter = setTimeout(() => {
					this.filters = []
					this.no_filter_results = false

					if ( this.projects.length )
						filter(this.projects)
					else filter(this.pages[0])
				}, 500)					
			},

			getMore() {
				if ( !this.projects.length ) 
					_.map(this.pages[0], project => this.projects.push(project))

				_.map(this.pages[this.next_page], project => this.projects.push(project))

				if ( this.pages[this.next_page + 1] ) {
					this.next_page + 1
					this.view_more_button = true
				} else this.view_more_button = false
			},

			setHeight() {
				if ( window.innerWidth < 768 ) {
					// console.log('fired')
					this.window_height = 400 + 'px'
				}
				
			}
		},
		components: {
			Project
		},	

		created() {
			// window.scroll(0, 0)
			// this.height = window.innerHeight + 'px'
			// window.addEventListener('resize', this.setHeight)
			// this.base_height = window.innerHeight
			// window.addEventListener('resize', this.setHeight)
			// this.window_height = window.innerHeight + 'px'
			this.getProjects()
		}
	}
</script>

<style lang="scss">
	@import '../scss/mixins';

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	.landing {
		background: #ebeae8;
		// min-height: 100vh;
		color: #444;
		// transition: min-height .4s;
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
				@include size(medium) {
					height: 3px;
				}
			}
		}
		&__header {
			font-family: 'Lato', sans-serif;
			text-transform: uppercase; 
			font-weight: 900;
			font-size: 4em;
			margin-bottom: 10px;
			@include size(medium) {
				font-size: 2.8em;
			}
		}
		&__sub-header {
			font-family: 'Lora', serif;
			font-weight: 400;
			font-size: 2.7em;
			font-style: italic;
			margin-bottom: 17px;
			@include size(medium) {
				font-size: 1.7em;
			}
			&:after {
				bottom: -8px;
			}
		}
		&-featured {
			font-family: 'Lato', sans-serif;
			text-transform: uppercase;
			font-weight: 300;
			@include size(medium) {
				font-size: .9em;
			}
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
			@include size(medium) {
				font-size: .9em;
				max-width: 70%;
			}
		}
		&__img {
			background: url(../../assets/landing.png) no-repeat;
			background-size: contain;
			background-position: center bottom;
			height: 49vh;
			width: 90%;
			position: relative;
			transition: max-width .4s, width .4s, height .4s;
			right: -50px;
			margin-top: auto;
			@include size(medium) {
				height: 45vh;
				width: 70%;
				max-width: 85%;
				right: -40px;
				min-width: 420px;
			}
			@media (max-width: 525px) {
				height: 40vh;
				width: 60%;
				min-width: 325px;
			}
			@media (max-width: 455px) {
				height: 30vh;
				width: 50%;
				right: -25px;
			}
			@media (max-width: 385px) {
				height: 25vh;
				width: 30%;
				min-width: 320px;
				right: -15px;
			}
			.scroll-icon {
				position: absolute;
				cursor: pointer;
				bottom: 20px;
				left: -100px;
				right: 0;
				@include size(medium) {
					left: -80px;
				}
				@media (max-width: 455px) {
					left: -60px;
					bottom: 10px; 
				}
				@media (max-width: 385px) {
					left: -30px;
					bottom: 5px;
				}
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
					@include size(medium) {
						color: #444;
						font-size: 1em;
					}
				}
				&__text {
					color: #5e5e5e;
					font-family: 'Lato', sans-serif;
					font-size: .93em;
					@include size(medium) {
						font-size: .88em;
						color: #444;
					}
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
		.filter {
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

	.no-results {
		margin-top: 50px;
		font-family: 'Lato', sans-serif;
		color: #777;
	}

	.view-more-wrap {
		// background: #f9f9f9;
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
	}
</style>