<template>
	<div id="contact">
		<div class="landing contact column y-center">
			<div class="landing-text">
				<form class="contact-form column">
					<h1 class="landing__header">Contact Me</h1>
					<h3>I'm looking forward to working with you!</h3>
					<ul class="errors">
						<li v-for="error in errors">{{ error }}</li>
					</ul>
					<input type="text" 
						v-model="message.name" 
						placeholder="Your Name" required>
					<input type="text" v-model="message.email" 
						placeholder="Email" 
						required>
					<textarea v-model="message.message"
						placeholder="Send me a Message" 
						required></textarea>
					<button class="submit-btn" type="submit"
						@click.prevent="sendMessage">Send</button>
				</form>
			</div>
		</div>
	</div>	
</template>

<script>
	export default {
		data() {
			return {
				message: {
					name: '',
					email: '',
					message: '',
					received: '',
					is_read: false,
					key: ''
				},
				errors: []
			}
		},
		methods: {
			sendMessage() {
				this.errors = []

				// Validate fields for string length
				if ( (this.message.name || this.message.email || this.message.message).length > 1000 ) {
					this.errors.push('Please shorten the length of your message.')
					return
				}

				// Validate Email
				const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

				if ( !email_regex.test(this.message.email) ) {
					this.errors.push('Please enter a valid email address.')
					return
				}
				
				// Try to save message
				const db = firebase.database(),
							messages = db.ref('/messages'),
							key = messages.push().key,
							time = new Date().getTime()

				this.message.received = time
				this.message.key = key
				messages.child(key).set(this.message)
				// Save succeeded
				.then(() => {
					this.message.name = ''
					this.message.email = ''
					this.message.message = ''
					this.message.date = ''

					this.$swal("Awesome!", "I'll get back with you soon!", "success")
				})
				// Save failed
				.catch(err => {
					this.$swal("Oops!", "Something went wrong. Please try again.", "error")
				})
			}
		}
	}
</script>

<style lang="scss">
	.contact {
		padding-top: 2vh;
		background: url(../assets/contact.jpg) no-repeat;
		background-position: top right;
		background-size: cover;	
		::-webkit-input-placeholder {
		   color: #333;
		}
		:-moz-placeholder { 
		   color: #333;  
		}
		::-moz-placeholder { 
		   color: #333;  
		}
		:-ms-input-placeholder {  
		   color: #333;  
		}
		&:after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100vh;
			background: rgba(#000, .5);
			z-index: 1;
		}
		form.contact-form {
			position: relative;
			z-index: 5;
			background: rgba(#333, .6);
			padding: 35px 25px 40px;
			border-radius: 1px;
			.landing__header {
				font-size: 3.4em;
				z-index: 5;
				color: #fff;
				align-self: flex-start;
				margin: 0 auto 15px;
				&:after {
					background: #fff;
				}
			}
			h3 {
				color: #fff;
				text-align: center;
				font-family: 'Lato', sans-serif;
				font-weight: 300;
				margin-bottom: 25px;
			}
			ul.errors {
				text-align: center;
				margin: -10px 0 15px;
				li {
					color: #EC6D6D;
					margin-bottom: 4px;
					font-family: 'Lato', sans-serif;
				}
			}
			input, textarea {
				padding: 9px 10px;
				margin-bottom: 6px;
				font-size: 1.2em;
				font-family: 'Lato', sans-serif;
				font-weight: 300;
				border-radius: 1px;
				min-width: 450px;
			}
		}
	}
</style>
