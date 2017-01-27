<template>
  <div class="container" >
  	<top-bar :is_admin="is_admin"></top-bar>
  	<router-view></router-view>
  	<app-footer v-if="$route.path != '/admin'"></app-footer>
  </div>
</template>

<script>
import TopBar from './components/TopBar.vue'
import Footer from './components/Footer.vue'
import faker from 'faker'
import { bus } from './main'

export default {
  data () {
    return {
      is_admin: false
    }
  },
  components: {
  	TopBar,
  	appFooter: Footer
  },
  created() {
  	const auth = firebase.auth()

		auth.onAuthStateChanged(user => {
			if ( user ) {
				const id = user.uid

				firebase.database().ref('/admins/' + id)
				.once('value').then(data => {
					if ( data.val() )
						this.is_admin = true
						// bus.setAdmin(true)
				})
			}
		})
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
  }
}
</script>

<style lang="scss">
	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	html, body {
		height: 100%;
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
		background: #5293cf;
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
</style>
