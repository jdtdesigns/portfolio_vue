<template>
	<div id="contact">
		<div class="overlay"
			:style="{'min-height': window_height}"></div>
		<div class="landing contact column y-center"
			:style="{'min-height': window_height}">
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
		computed: {
			window_height() {
				return window.innerWidth < 768 ? window.innerHeight + 'px' : '100vh'
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
					this.$swal("Oops!", "Something went wrong. Please try again. You can contact me directly at jd.tadlock@yahoo.com", "error")
				})
			}
		},

		created() {
			window.scroll(0, 0)
			document.title = 'JD Tadlock | Contact'
		}
	}
</script>

<style lang="scss">
	@import './scss/mixins';
	.overlay {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		background: rgba(#000, .5);
		z-index: 1;
	}
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
		form.contact-form {
			position: relative;
			z-index: 5;
			background: rgba(#333, .6);
			padding: 35px 25px 40px;
			border-radius: 1px;
			@include size(medium) {
				width: 100%;
			}
			@include size(small) {
				padding: 25px 18px 30px;
			}
			.landing__header {
				font-size: 3.4em;
				z-index: 5;
				color: #fff;
				align-self: flex-start;
				margin: 0 auto 15px;
				@include size(medium) {
					font-size: 2.8em;
				}
				@media (max-width: 400px) {
					font-size: 2.2em;
				}
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
				@include size(medium) {
					font-size: 1.1em;
				}
				@media (max-width: 400px) {
					font-size: .95em;
				}
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
				@include size(medium) {
					min-width: 95%;
				}
				@media (max-width: 500px) {
					font-size: 1.1em;
					padding: 8px 9px;
				}
			}
		}
	}
</style>
