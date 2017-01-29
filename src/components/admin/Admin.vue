<template>
	<div class="landing admin">
		<create-modal 
			v-if="show_modal"
			@close_modal="show_modal = $event"></create-modal>
		<div class="landing-text">
			<div class="admin-panel column y-center">
				<h1>Admin Panel</h1>
				<div class="row x-center">
					<button class="admin-menu-btn column y-center x-center"
					@click="show_messages = false"
					:class="{active: !show_messages}"><i class="fa fa-file-text"></i>Projects</button>
					<button class="admin-menu-btn column y-center x-center"
						@click="show_messages = true"
						:class="{active: show_messages}"><i class="fa fa-envelope-o"></i>Messages</button>
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
						<tr v-for="project in projects" :data-project="project.key">
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
									@click="editProject(project.key)"></i>
								<i class="fa fa-trash"></i>
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
						<message v-for="message in messages" :message="message"></message>
						<tr v-if="!messages.length">
							<td colspan="4" height="100">No Messages Currently.</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	import CreateModal from './CreateModal.vue'
	import Message from './Message.vue'

	export default {
		data() {
			return {
				show_modal: false,
				show_new_messages: true,
				loaded: false,
				show_messages: false,
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
				message_data: []
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
			}
		},
		methods: {
			showModal() {
				if ( !this.show_modal ) {
					document.body.addEventListener('click', this.hideModal)
					this.show_modal = true
				} else this.hideModal()
			},

			hideModal() {
				this.show_modal = false
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

						_.map(project.images, ref  => {
							if ( ref.match(/(main)/) ) {
								storage.ref(ref).getDownloadURL()
								.then(url => {
									new_project.title = project.title
									new_project.image = url
									new_project.date = date,
									new_project.created = project.date_added
									new_project.key = data.key
									new_project.tags = project.tags

									this.data.push(new_project)
								})
							}
						})
					})				
			},

			getMessages() {
				const db = firebase.database(),
							messages = db.ref('/messages')

				messages.on('child_added', message => {
					this.message_data.push(message.val())
				})
			},

			editProject(key) {
				console.log(key)
			}
		},
		components: {
			CreateModal,
			Message
		},
		created() {
			// this.getProjects()
			this.getMessages()
			// console.log(this.messages)
		}	
	}
</script>

<style lang="scss">
	.admin {
		background: #444;
		min-height: 110vh;
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
							&:hover {
								background: #eee;
								color: #333;
							}
						}
					}
				}
			}
		}
	}
</style>