<template>
	<div id="contact">
		<div class="landing contact column y-center">
			<div class="landing-text">
				<form class="contact-form column">
					<h1 class="landing__header">Contact Me</h1>
					<h3>I'm looking forward to working with you!</h3>
					<input type="text" 
						v-model="name" 
						placeholder="Your Name" required>
					<input type="text" v-model="email" 
						placeholder="Email" 
						required>
					<textarea v-model="message"
						placeholder="Send me a Message" 
						required></textarea>
					<button class="submit-btn" type="submit">Send</button>
				</form>
			</div>
		</div>
	</div>	
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				email: '',
				message: ''
			}
		}
	}
</script>

<style lang="scss">
	.contact {
		padding-top: 2vh;
		background: url(../assets/contact.jpg) no-repeat;
		background-position: right right;
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
