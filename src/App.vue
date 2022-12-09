<template>
	<div class="app">
		<!-- Sidebar -->
		<Sidebar />

		<!-- Content -->
    <div class="content">
      <router-view :key="$route.path"/>
    </div>
	</div>
</template>


<script>
import Sidebar from '@/components/SideBar.vue'

export default {
  name: "App",
  components: {
    Sidebar
  },
  data: function () {
    return {
    }
  },
  mounted() {
  },
  watch: {
  },
  methods: {
  }
};
</script>

<style>
body {
  background-color: #F1F5F8;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Fira sans', sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html, body {
  margin: 0px;
}

.content {
  width: 100%;
  margin-left: calc(2rem + 32px);
  transition: 0.2s ease-in-out;
  /* overflow: hidden; */
}

 button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
}
 .app {
	display: flex;
}
 .app main {
	flex: 1 1 0;
	padding: 2rem;
}
 @media (max-width: 1024px) {
	.app main {
	padding-left: 6rem;
	}
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
