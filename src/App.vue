<template>
  <div class="container" >
  	<top-bar></top-bar>
  	<router-view></router-view>
  	<app-footer v-if="$route.path != '/admin'"></app-footer>
  </div>
</template>

<script>
import TopBar from './components/TopBar.vue'
import Footer from './components/Footer.vue'
// import faker from 'faker'
import { bus } from './main'

export default {
  components: {
  	TopBar,
  	appFooter: Footer
  },
  created() {
  	
  	// firebase.auth().createUserWithEmailAndPassword('jt7903@gmail.com', 'jdluvssarah1983')
  	// .catch(err => console.log(err))

  // 	const db = firebase.database(),
		// 			projects = db.ref('projects/')
		// let c

		// for ( c = 0; c < 10; c++ ) {
		// 	let tags = [], images_sub = [], i,
		// 			key = projects.push().key

		// 	for ( i = 0; i < 5; i++ ) {
		// 		images_sub.push(faker.image.image())
		// 		tags.push(faker.lorem.word())
		// 	}


		// 	let project = {
		// 		title: faker.lorem.sentence(),
		// 		description: faker.lorem.paragraphs(),
		// 		tags: tags,
		// 		image_main: faker.image.image(),
		// 		images_sub: images_sub
		// 	}

		// 	// firebase.storage().ref()
		// 	// 	.child(`images/${key}/${this.image_name}`)
		// 	// 	.put(this.image)
		// 	projects.child(key).set(project)
		// }
		// firebase.auth().signOut()
  }
}
</script>

<style lang="scss">
	@import './components/scss/variables';

	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	html, body {
		min-height: 100%;
	}

	body {
		overflow-x: hidden;
	}

	img {
		max-width: 100%;
	}

	button, input, textarea {
		outline: none;
		border: none;
	}

	button {
		cursor: pointer;
	}

	button.submit-btn {
		padding: 11px 0 13px;
		font-size: 1.2em;
		text-transform: uppercase;
		font-family: 'Lato', sans-serif;
		font-weight: 400;
		background: $blue;
		color: #fff;
		border-radius: 1px;
		margin-top: 5px;
		transition: background .3s;
		&:hover {
			background: darken(#5293cf, 3%);
		}
	}

	textarea {
		min-height: 150px;
	}

	a {
		text-decoration: none;
		color: #333;
	}

	ul {
		list-style: none;
	}
	.row, .column {
		display: flex;
	}

	.column {
		flex-direction: column;
	}

	.x-center {
		justify-content: center;
	}

	.y-center {
		align-items: center;
	}

	.wrap {
		flex-wrap: wrap;
	}

	.split {
		justify-content: space-between;
	}

	.split-center {
		justify-content: space-around;
	}

	.right {
		justify-content: flex-end;
	}
	.swal2-container.swal2-in {
		background-color: rgba(#000, .5) !important;
	}

	.swal2-modal {
		font-family: 'Lato', sans-serif !important;
		border-radius: 2px !important;
		background: #333 !important;
		h2, .swal2-content {
			color: #eee !important;
		}
		.swal2-icon:after, .swal2-icon:before {
			background: #333 !important;
		}
		.swal2-icon.swal2-success .fix {
			background: #333 !important;
		}
	}

	.swal2-confirm.swal2-styled {
		border: none !important;
		background: #555 !important;
		border-radius: 1px !important;
		padding: 10px 40px !important;
		transition: background .3s !important;
		&:hover {
			background: lighten(#555, 2%) !important;
		}
	}
</style>
