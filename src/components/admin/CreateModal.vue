<template>
	<div class="create-modal column y-center">
		<form class="column" @click.stop>
			<h1>Create Project</h1>
			<input type="text" v-model="title" placeholder="Title" required>
			<textarea v-model="description" placeholder="Description" required></textarea>
			<ul class="tags row">
				<span v-if="!tags.length">No Tags Added</span>
				<li v-for="tag in tags"
					@click="removeTag(tag)">{{ tag }}
					<i class="fa fa-times-circle"></i>
				</li>
			</ul>
			<input class="add-tag" 
				type="text" 
				placeholder="Tag Name"
				v-model="tag"
				@keyup.13="addTag">
			<div class="image-previews row">
				<span v-if="!image_previews.length">No Images Added</span>
				<img v-for="(image, i) in image_previews" 
					:src="image[1]" 
					:class="{main: image[0] == 'main'}"
					@click="removeImage(i)">
			</div>
			<label for="main-image-submit">Main Image:</label>
			<input id="main-image-submit" 
					type="file"
					@change="addImage('main', $event)" 
					:disabled="has_main_image">
			<label for="image-submit">Add Another Image:</label>
			<input id="image-submit" 
				type="file"
				@change="addImage('sub', $event)">
			<button class="submit-btn" 
				type="submit"
				@click.prevent="addProject">Save</button>
		</form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				description: '',
				tag: '',
				tags: [],
				images: [],
				has_main_image: false,
				image_previews: []
			}
		},
		methods: {
			addTag() {
				if ( this.tag ) this.tags.push(this.tag)
				this.tag = ''
			},

			removeTag(tag) {
				_.map(this.tags, (val, i) => {
					if ( val == tag ) this.tags.splice(i, 1)
				})
			},

			removeImage(index) {
				if ( this.image_previews[index][0] == 'main' )
					this.has_main_image = false
				
				this.image_previews.splice(index, 1)				
				this.images.splice(index, 1)	
			},

			addImage(type, e) {
				let reader = new FileReader(),
						format = e.target.files[0].name
							.slice(e.target.files[0].name.indexOf('.')),
						name = type == 'main' ? `main${format}` : 
							`${this.images.length + format}`			

				if ( type == 'main' ) this.has_main_image = true
							
				reader.onload = e => {
					this.image_previews.push([type, e.target.result]) 
				}

				reader.readAsDataURL(e.target.files[0])
				this.images
					.push([name, e.target.files[0]])

				e.target.value = ''
			},
			
			addProject() {
				if ( !this.title ||
				 !this.description || 
				 !this.tags.length || 
				 !this.has_main_image ) return

				this.$emit('close_modal', false)

				const db = firebase.database(),
							projects = db.ref('projects/'),
							key = projects.push().key

				let project = {
					title: this.title,
					description: this.description,
					tags: this.tags,
					images: [],
					date_added: new Date().getTime()
				}

				_.map(this.images, (image, i) => {
					let image_ref = firebase.storage().ref()
						.child(`images/${key}/${image[0]}`)

					// Save image in storage then push the full path
					// to the project object
					image_ref.put(image[1]).then(snapshot => {
						project.images.push(image_ref.fullPath)

						if ( i === this.images.length - 1 ) {
							projects.child(key).set(project)

							this.title = ''
							this.description = ''
							this.tags = []
							this.images = []
							this.image_previews = []
						}
					})				
				})
			}
		}
	}
</script>

<style lang="scss">
	.create-modal {
		position: absolute;
		top: 80px;
		left: 0;
		right: 0;
		margin: 0 auto;
		z-index: 99;
		&:before {
			content: '';
			position: absolute;
			top: -80px;
			left: 0;
			width: 100%;
			height: 100vh;
			background: rgba(#000, .3);
			z-index: -1;
		}
		h1, span, form input, form textarea, button, label {
			font-family: 'Lato', sans-serif;
		}
		h1 {
			margin-bottom: 15px;
			text-align: center;
		}
		form {
			background: #444;
			padding: 20px;
			color: #eee;
			input, textarea {
				padding: 8px 10px;
				font-size: 1.1em;
				margin-bottom: 5px;
				&:not(.add-tag) {
					min-width: 450px;
				}
				&[type="file"] {
					margin: 0;
					padding: 0;
				}
			}
			label {
				margin: 8px 0 5px;
			}
			.image-previews {
				flex-wrap: wrap;
				margin-top: 5px;
				min-height: 75px;
				border: 1px dashed #999;
				padding: 8px;
				max-width: 450px;
				img {
					max-height: 50px;
					margin-bottom: 5px;
					border: 2px solid transparent;
					cursor: pointer;
					&.main {
						border-color: #eee;
					}
					&:not(:last-child) {
						margin-right: 5px;
					}
				}
			}
			input {
				&.add-tag {
					width: 230px;
				}
			}
			ul.tags {
				min-height: 25px;
				border: 1px dashed #999;
				align-self: flex-start;
				width: 230px;
				margin: 5px 0 5px;
				padding: 10px 7px;
				flex-wrap: wrap;
				user-select: none;
				span {
					color: #888;
				}
				li {
					color: #eee;
					cursor: pointer;
					margin-bottom: 5px;
					&:not(:last-child) {
						margin-right: 10px;
					}
				}
			}
			button {
				align-self: flex-start;
				width: 200px;
				margin: 15px auto 0;
				padding: 9px 0 11px;
			}
		}
	}
</style>