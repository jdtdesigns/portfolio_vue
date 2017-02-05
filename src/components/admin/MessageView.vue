<template>
	<div class="message-view column y-center">
		<div class="message-view-content column">
			<div class="row x-center">
				<h1>Messenger</h1>
			</div>
			<div class="text-wrap column">
				<span>Name: {{ message.name }}</span>
				<span>Email: <a :href="email_link">{{ message.email }}</a></span>
				<span>Message: </span>
				<p>{{ message.message }}</p>
				<div class="row x-center">
					<button class="close-message"
						@click="closeMessage">Close</button>
					<button class="delete-message"
						@click="deleteMessage">Delete</button>
				</div>
			</div>
		</div>	
	</div>
</template>

<script>
	export default {
		props: ['message'],

		data() {
			return {
				email_link: `mailto:${this.message.email}`
			}
		},

		methods: {
			closeMessage() {
				this.$emit('closeMessage')
			},

			deleteMessage() {
				this.$emit('deleteMessage', this.message)
			}
		}
	}
</script>

<style lang="scss">
	.message-view {
		position: absolute;
		top: 70px;
		left: 0;
		right: 0;
		margin: 0 auto;
		z-index: 501;
		&:after {
			content: '';
			position: absolute;
			top: -70px; 
			left: 0;
			right: 0;
			width: 100%;
			height: 100vh;
			background: rgba(#000, .4);
			z-index: -1;
		}
		&-content {
			background: #696969;
			padding: 30px 40px;
			font-family: 'Lato', sans-serif;
			color: #e9e9e9;
			width: 45%;
			border-radius: 1px;
			box-shadow: 2px 2px 10px rgba(#000, .1); 
			.text-wrap {
				border: 1px dashed #494949;
				padding: 25px 20px;
				margin-top: 5px;
				span {
					font-weight: 400;
					font-size: 1.2em;
					a {
						color: #eee;
						border-bottom: 1px dotted #eee;
					}
				}
				& > * {
					margin-bottom: 5px;
				}
				p {
					line-height: 1.55;
					padding-left: 3px;
					font-size: 1.1em;
					margin-bottom: 30px;
				}
				button {
					margin: 0 8px;
					padding: 6px 20px 8px;
					font-family: 'Lato', sans-serif;
					font-size: 1.2em;
					color: #e0e0e0;
					transition: opacity .3s;
					&:hover {
						opacity: .9;
					}
					&.close-message {
						background: #404040;
					}
					&.delete-message {
						background: #c95757;
					}
				}
			}
		}
	}
</style>
