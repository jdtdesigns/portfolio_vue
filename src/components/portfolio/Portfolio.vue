<template>
	<section id="portfolio">
		<project v-for="n in 6"></project>
	</section>
</template>

<script>
	import Project from './Project.vue'

	export default {
		components: {
			Project
		}	
	}
</script>

<style lang="scss">
	
</style>