<template>
  <div class="container" >
  	<top-bar></top-bar>
  	<landing></landing>
  	<portfolio></portfolio>
  	<app-footer></app-footer>
  </div>
</template>

<script>
import TopBar from './components/TopBar.vue'
import Footer from './components/Footer.vue'
import Landing from './components/Landing.vue'
import Portfolio from './components/portfolio/Portfolio.vue'

export default {
  data () {
    return {
      
    }
  },
  components: {
  	TopBar,
  	appFooter: Footer,
  	Landing,
  	Portfolio
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

	section {
		.section-header {
			text-align: center;
			padding: 55px 0;
			font-family: 'Lato', sans-serif;
			font-weight: 400;
			color: #777;
		}
	}
</style>
