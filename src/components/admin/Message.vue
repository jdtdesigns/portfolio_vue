<template>
	<tr :data-message="message.key">
		<td>{{ date }}</td>
		<td>{{ message.name }}</td>
		<td>{{ message.email }}</td>
		<td>
			<button class="view-message">View</button>
		</td>
	</tr>
</template>

<script>
	export default {
		props: ['message'],
		computed: {
			date() {
				const time = new Date(this.message.received)

				return `${time.getMonth() + 1}/${time.getDate()}/${time.getFullYear()}`
			}
		}
	}
</script>

<style lang="scss">
	
</style>