<template>
	<div class="content">
		<div class="item">
			<div class="row">
				<div class="item__image">
					<img :src="project.main_image" alt="">
				</div>
				<div class="item-content column x-center">
					<div class="item-tags row">
						<span v-for="tag in project.tags">{{ tag }}</span>
					</div>
					<h2 class="item__header">{{ project.title }}</h2>
					<p class="item__text">{{ project.description }}</p>
					<a :href="project.link" target="_blank" class="item__btn">View Project Here</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['project']
	}
</script>

<style lang="scss">
	@import '../scss/mixins';

	.content {
		opacity: 0;
	}
	.content:nth-child(even) {
		background: #eae9e7;
		.item__image {
			order: 2;
			@media (max-width: 700px) {
				order: 1;
			}
		}
		.item-content {
			order: 1;
			padding: 0 70px 0 0;
			@include size(medium) {
				padding: 0 20px 0 0;
			}
			@media (max-width: 700px) {
				order: 2;
			}
		}
	}
	.item {
		padding: 70px 10%;
		flex-wrap: wrap;
		@include size(medium) {
			padding: 60px 4%;
		}
		&__image {
			width: 40%;
			@include size(medium) {
				width: 45%;
			}
			@media (max-width: 700px) {
				width: 70%;
				margin-bottom: 30px;
			}
			@include size(small) {
				width: 90%;
			} 
			img {
				max-height: 350px;
			}
		}
		@media (max-width: 700px) {
			& > div {
				flex-direction: column;
				align-items: center;
			}
		}
		&-content {
			width: 60%;
			padding-left: 70px;
			@include size(medium) {
				width: 55%;
				padding-left: 50px;
			}
			@media (max-width: 700px) {
				width: 95%;
				padding-left: 0;
			}
			@include size(small) {
				padding-left: 15px !important;
			}
			.item-tags {
				margin-bottom: 15px;
				span {
					margin-right: 20px;
					font-family: 'Lato', sans-serif;
					position: relative;
					@include size(medium) {
						font-size: .9em;
					}
					@include size(small) {
						margin-right: 15px;
					}
					&:not(:last-child):after {
						content: '';
						position: absolute;
						right: -10px;
						top: 2px;
						height: 100%;
						width: 1px;
						background: #444;
						@include size(small) {
							right: -8px;
						}
					}
				}
			}
			.item__header {
				font-family: 'Lora', serif;
				font-weight: 400;
				font-style: italic;
				font-size: 1.7em;
				line-height: 1.3;
				margin-bottom: 20px;
				@include size(medium) {
					font-size: 1.3em;
				}
				@include size(small) {
					line-height: 1.1;
					margin-bottom: 13px;
				}
			}
			.item__text {
				font-family: 'Lato', sans-serif;
				font-size: .95em;
				line-height: 1.9;
				margin-bottom: 23px;
				@include size(medium) {
					font-size: .9em;
				}
				@include size(small) {
					font-size: .85em;
				}
			}
			.item__btn {
				background: none;
				text-transform: uppercase;
				font-size: 1.05em;
				font-family: 'Lato', sans-serif;
				font-weight: 300;
				border-bottom: 1px dotted #333;
				padding-bottom: 2px;
				display: inline-block;
				align-self: flex-start;
				@include size(medium) {
					font-size: 1em;
				}
				@include size(small) {
					font-size: .9em;
				}
			}
		}
	}
</style>