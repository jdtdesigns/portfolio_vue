<template>
	<div class="landing admin">
		<create-modal 
			v-if="show_modal"
			@close_modal="show_modal = $event"></create-modal>
		<div class="landing-text">
			<div class="project-list column y-center">
				<h1>Project Listing</h1>
				<div class="row x-center">
					<button class="admin-menu-btn column y-center x-center"
					@click.stop="showModal"
					:class="{active: !show_messages}"><i class="fa fa-file-text"></i>Projects</button>
					<button class="admin-menu-btn column y-center x-center"
						@click.stop="showModal"
						:class="{active: show_messages}"><i class="fa fa-envelope-o"></i>Messages</button>
				</div>
				<button class="add-project row y-center"><i class="fa fa-plus-square"></i>Add Project</button>
				<table>
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
			</div>
		</div>
	</div>
</template>

<script>
	import CreateModal from './CreateModal.vue'

	export default {
		data() {
			return {
				show_modal: false,
				data: [],
				loaded: false,
				show_messages: false
			}
		},
		computed: {
			projects() {
				return _.orderBy(this.data, ['created'], ['desc'])
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

			editProject(key) {
				console.log(key)
			}
		},
		components: {
			CreateModal
		},
		created() {
			this.getProjects()
		}	
	}
</script>

<style lang="scss">
	.admin {
		background: #444;
		h1 {
			color: #ddd;
			font-weight: 300;
			margin-bottom: 15px;
		}
	}
	.project-list {
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
			&:hover, &.active {
				background: #dedede;
				color: #333;
			}
			.fa {
				font-size: 1.3em;
				margin-bottom: 8px;
			}
		}
		button.add-project {
			// position: absolute;
			// top: -33px;
			// left: 1px;
			margin-top: 20px;
			padding: 5px 13px;
			background: none;
			border: 1px solid #eee;
			border-radius: 2px;
			color: #eee;
			font-size: .95em;
			transition: background .3s, color .3s;
			&:hover {
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
					}
				}
			}
		}
	}
</style>