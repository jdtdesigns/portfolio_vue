<template>
	<div class="content">
		<div class="item">
			<div class="row">
				<div class="item__image">
					<img :src="project.image" alt="">
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
	.content:nth-child(even) {
		background: #eae9e7;
		.item__image {
			order: 2;
		}
		.item-content {
			order: 1;
			padding: 0 70px 0 0;
		}
	}
	.item {
		padding: 70px 10%;
		flex-wrap: wrap;
		&__image {
			width: 40%;
			img {
				max-height: 350px;
			}
		}
		&-content {
			width: 60%;
			padding-left: 70px;
			.item-tags {
				margin-bottom: 15px;
				span {
					margin-right: 20px;
					font-family: 'Lato', sans-serif;
					position: relative;
					&:not(:last-child):after {
						content: '';
						position: absolute;
						right: -10px;
						top: 2px;
						height: 100%;
						width: 1px;
						background: #444;
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
			}
			.item__text {
				font-family: 'Lato', sans-serif;
				font-size: .95em;
				line-height: 1.9;
				margin-bottom: 23px;
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
			}
		}
	}
</style>