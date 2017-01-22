<template>
  <div class="container" >
  	<top-bar></top-bar>
  	<router-view></router-view>
  	<app-footer></app-footer>
  </div>
</template>

<script>
import TopBar from './components/TopBar.vue'
import Footer from './components/Footer.vue'

export default {
  data () {
    return {
      
    }
  },
  components: {
  	TopBar,
  	appFooter: Footer
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

	button, input {
		outline: none;
		border: none;
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
