<template>
	<div class="landing admin"
		:style="{'min-height': window_height}">
		<message-view
			:message="message_view"
			v-if="message_view"
			@closeMessage="closeMessage"
			@deleteMessage="deleteMessage($event)"></message-view>

		<create-modal 
			v-if="show_modal"
			@close_modal="show_modal = $event"
			@open="show_modal = $event"
			:edit_project="edit_project"
			:edit_key="edit_key"></create-modal>

		<div class="landing-text">
			<div class="admin-panel column y-center">
				<h1>Admin Panel</h1>
				<div class="row x-center">
					<button class="admin-menu-btn column y-center x-center"
					@click="show_messages = false"
					:class="{active: !show_messages}"><i class="fa fa-file-text"></i>Projects</button>
					<button class="admin-menu-btn column y-center x-center"
						@click="show_messages = true"
						:class="{active: show_messages, 'new-messages': new_messages}"><i class="fa fa-envelope-o"></i>Messages</button>
				</div>
				<button class="admin-action-btn row y-center"
					@click.stop="showModal"
					v-if="!show_messages"><i class="fa fa-plus-square"></i>Add Project</button>
				<div class="row">
					<button class="admin-action-btn row y-center"
						@click="show_new_messages = true"
						v-if="show_messages"
						:class="{active: show_new_messages}"><i class="fa fa-inbox"></i>Unread</button>
					<button class="admin-action-btn row y-center"
						@click="show_new_messages = false"
						v-if="show_messages"
						:class="{active: !show_new_messages}"><i class="fa fa-archive"></i>Archive</button>
				</div>
				<table v-if="!show_messages">
					<thead>
						<th>Image</th>
						<th>Title</th>
						<th>Tags</th>
						<th>Date Added</th>
						<th></th>
					</thead>
					<tbody>
						<tr v-if="!data.length">
							<td colspan="5" height="100">No Projects Currently.</td>
						</tr>
						<tr v-for="(project, i) in projects" :data-project="project.key">
							<td>
								<img :src="project.image">
							</td>
							<td>{{ project.title }}</td>
							<td>
								<span v-for="tag in project.tags">{{ tag }}</span>
							</td>
							<td>{{ project.date }}</td>
							<td>
								<i class="fa fa-edit"
									@click.stop="showModal('edit', project.key)"></i>
								<i class="fa fa-trash"
									@click="deleteProject(project.key, i)"></i>
							</td>
						</tr>
					</tbody>
				</table>

				<table v-if="show_messages">
					<thead>
						<th>Received</th>
						<th>Name</th>
						<th>Email</th>
						<th></th>
					</thead>
					<tbody>
						<message v-for="message in messages" 
							:message="message"
							@show_message="showMessage($event)"></message>
						<tr v-if="!messages.length">
							<td colspan="4" height="100">No Messages Currently.</td>
						</tr>
					</tbody>
				</table>

				<button class="log-out"
					@click="logout">Log Out</button>
			</div>
		</div>
	</div>
</template>

<script>
	import CreateModal from './CreateModal.vue'
	import Message from './Message.vue'
	import MessageView from './MessageView.vue'
	import { bus } from '../../main'

	export default {
		data() {
			return {
				show_modal: false,
				show_new_messages: true,
				loaded: false,
				show_messages: false,
				edit_project: null,
				edit_key: '',
				data: [],
				new_messages: false,
				message_data: [],
				message_view: null
			}
		},
		computed: {
			projects() {
				return _.orderBy(this.data, ['created'], ['desc'])
			},
			messages() {
				return _.orderBy(_.filter(this.message_data, message => {
					return this.show_new_messages ? !message.is_read : message.is_read
				}), ['received'], ['desc'])
			},
			window_height() {
				return window.innerWidth < 768 ? window.innerHeight + 'px' : '110vh'
			}
		},
		methods: {
			showModal(type, key) {
				if ( !this.show_modal ) {
					document.body.addEventListener('click', this.hideModal)

					if ( type == 'edit' ) {
						const db = firebase.database()

						db.ref(`projects/${key}`).once('value').then(project => {
							const storage = firebase.storage()

							project = project.val()
							project.image_previews = []

							_.map(project.images, (image, i) => {
								storage.refFromURL(image).getDownloadURL()
								.then(url => {
									if ( image.match(/(main)/) ) 
										project.image_previews.push(['main', url])
									else project.image_previews.push(['sub', url])

									if ( i === project.images.length - 1 ) {
										this.edit_project = project
										this.edit_key = key
										this.show_modal = true
									}
								})
							})							
						})
					} else this.show_modal = true
				} else this.hideModal()
			},

			hideModal() {
				this.show_modal = false
				this.edit_project = null
				this.edit_key = ''

				document.body.removeEventListener('click', this.showModal)
			},

			getProjects() {
				const db = firebase.database()
				
				this.show_modal = false

				db.ref('/projects')
					.on('child_added', data => {
						const storage = firebase.storage(),
									project = data.val(),
									new_project = {},
									added = new Date(project.date_added),
									date = `${added.getMonth() + 1}/${added.getDate()}/${added.getFullYear()}`

						const addToProjects = url => {
							new_project.title = project.title
							new_project.image = url
							new_project.date = date,
							new_project.created = project.date_added
							new_project.key = data.key
							new_project.tags = project.tags

							this.data.push(new_project)
						} 

						_.map(project.images, ref  => {

							if ( ref.match(/(main)/) ) {
								if ( !ref.match(/(firebasestorage)/) ) {
									storage.refFromURL(ref).getDownloadURL()
									.then(url => {
										addToProjects(url)
									})	
								} else addToProjects(ref)
							}
						})
					})				
			},

			getMessages() {
				const db = firebase.database(),
							messages = db.ref('/messages')

				messages.on('child_added', message => {
					if ( !message.val().is_read ) this.new_messages = true
					this.message_data.push(message.val())
				})
			},

			deleteProject(key, index) {
				this.$swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this file!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!"
				}).then(() => {
					const project = firebase.database().ref('/projects/' + key)

					project.remove()

					_.map(this.data, (project, i) => {
						if ( key == project.key ) this.data.splice(i, 1)
					})				
				  this.$swal("Deleted!", "The project was deleted.", "success")
				})
			},

			showMessage(message) {
				const ref = firebase.database().ref('/messages/' + message.key)

				ref.update({is_read: true})
				
				const index = this.message_data.indexOf(message)
				this.message_data[index].is_read = true
				this.message_view = message
			},

			closeMessage() {
				this.message_view = null

				if ( !_.find(this.message_data, {is_read: false}) )
					this.new_messages = false
			},

			deleteMessage(message) {
				this.$swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this message!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!"
				}).then(() => {
					const ref = firebase.database().ref('/messages/' + message.key)

					this.message_view = null
					ref.remove()

					_.map(this.message_data, (m, i) => {
						if ( message.key == m.key ) this.message_data.splice(i, 1)
					})

				  this.$swal("Success!", "The message was deleted.", "success")
				})
			},

			logout() {
				firebase.auth().signOut()
			}
		},

		components: {
			CreateModal,
			Message,
			MessageView
		},

		created() {
			window.scroll(0, 0)
			this.getProjects()
			this.getMessages()
			document.title = 'JD Tadlock | Admin'
		}	
	}
</script>

<style lang="scss">
	.admin {
		background: #444;
		padding-bottom: 100px;
		h1 {
			color: #ddd;
			font-weight: 300;
			margin-bottom: 15px;
		}
	}
	.admin-panel {
		padding: 0 5%;
		font-family: 'Lato', sans-serif;
		button.admin-menu-btn {
			font-size: .95em;
			background: none;
			color: #dedede;
			border: 2px solid #dedede;
			border-radius: 2px;
			width: 110px;
			height: 70px;
			padding-bottom: 3px;
			margin: 0 8px;
			transition: background .3s, color .3s;
			user-select: none;
			&:hover, &.active {
				background: #dedede;
				color: #333;
			}
			&.new-messages .fa {
				position: relative;
				&:after {
					content: '';
					position: absolute;
					right: -9px;
					top: -1px;
					z-index: 1;
					width: 13px;
					height: 13px;
					background: #ee5858;
					border-radius: 50%;
				}
			}
			.fa {
				font-size: 1.3em;
				margin-bottom: 8px;
			}
		}
		button.admin-action-btn {
			margin: 20px 5px 0;
			padding: 5px 13px;
			background: none;
			border: 1px solid #eee;
			border-radius: 2px;
			color: #eee;
			font-size: .95em;
			transition: background .3s, color .3s;
			user-select: none;
			&:hover, &.active {
				background: #eee;
				color: #333;
			}
			.fa {
				margin-right: 7px;
			}
		}
		table {
			margin-top: 15px;
			color: #eee;
			min-width: 50%;
			border-collapse: collapse;
			border: 1px solid #3c3c3c;
			position: relative;
			thead {
				border-bottom: 1px solid #535353;
				th {
					padding: 18px 0 15px;
					background: #5b5b5b;
					min-width: 100px;
					font-weight: 700;
				}
			}
			tbody {
				tr {
					text-align: center;
					background: #828282;
					height: 60px;
					&:nth-child(even) {
						background: #767676;
					}
					td {
						min-width: 150px;
						padding: 0 10px;
						img {
							height: 40px;
						}
						span {
							&:not(:last-child):after {
								content: ',';
								margin-right: 4px;
							}
						}
						.fa {
							font-size: 1.2em;
							cursor: pointer;
							transition: color .3s;
							&:hover {
								color: #fff;
							}
							&.fa-edit {
								position: relative;
								bottom: -1px;
								margin-right: 8px;
							}
						}
						button.view-message {
							background: none;
							border: 1px solid #eee;
							border-radius: 2px;
							padding: 4px 10px;
							color: #eee;
							transition: background .3s, color .3s;
							user-select: none;
							&:hover {
								background: #eee;
								color: #333;
							}
						}
					}
				}
			}
		}
		button.log-out {
			margin-top: 15px;
			padding: 10px 35px;
			color: #eee;
			background: #555;
		}
	}
</style>