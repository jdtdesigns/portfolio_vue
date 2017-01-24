<template>
	<div class="landing">
		<create v-if="show_modal"></create>
		<div class="landing-text">
			<div class="row">
				<button class="add-project"
					@click.stop="showModal()">Add Project</button>
			</div>
			<div class="project-list">
				
			</div>
		</div>
	</div>
</template>

<script>
	import Create from './Create.vue'

	export default {
		data() {
			return {
				show_modal: false
			}
		},
		methods: {
			showModal() {
				this.show_modal = !this.show_modal
				document.body.addEventListener('click', this.hideModal)
			},
			hideModal() {
				this.show_modal = false
				document.body.removeEventListener('click', this.showModal)
			}
		},
		components: {
			Create
		}
		// created() {
		// 	bus.$on('toggle_create_modal', () => {
		// 		this.showModal()
		// 	})
		// }	
	}
</script>

<style lang="scss">
	
</style>