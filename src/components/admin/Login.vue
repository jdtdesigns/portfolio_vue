<template>
	<div class="login-form column y-center">
		<form class="column">
			<h1>Login</h1>
			<span>{{ error }}</span>
			<input type="text" v-model="email" placeholder="Email">
			<input type="password" v-model="password" placeholder="Password">
			<button type="submit"
				@click.stop="login">Login</button>
		</form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				email: '',
				password: '',
				error: ''
			}
		},
		methods: {
			login() {
				const auth = firebase.auth()

				this.error = ''
				auth.signInWithEmailAndPassword(this.email, this.password)
				.then(() => {
					this.$router.push('/admin')
				}, error => this.error = 'There was an error. Try again.')
			}
		}
	}
</script>

<style lang="scss">
	.login-form {
		min-height: 100vh;
		padding-top: 150px;
		form {
			background: #bbb;
			padding: 25px;
			font-family: 'Lato', sans-serif;
			border-radius: 1px;
			span {
				text-align: center;
				margin-bottom: 7px;
				color: #a73636;
			}
			h1 {
				text-align: center;
				margin-bottom: 15px;
				color: #333;
				font-weight: 300;
			}
			input {
				padding: 7px 10px;
				font-size: 1.2em;
				margin-bottom: 5px;
			}
			button {
				padding: 8px 0;
				font-size: 1.2em;
				background: #555;
				color: #fff;
				margin-top: 10px;
				font-weight: 300;
				font-family: 'Lato', sans-serif;
			}
		}
	}
</style>