
<template>
	<aside :class="`${is_expanded ? 'is-expanded' : ''}`">
		<div class="logo">
			<router-link :to="{name: 'home'}">
				<img :src="logoURL" alt="Vue" /> 
			</router-link>
		</div>

		<h2 class="company-name">Gaming HOF</h2>

		<div class="menu-toggle-wrap">
			<button class="menu-toggle" @click="ToggleMenu">
				<span class="material-icons">keyboard_double_arrow_right</span>
			</button>
		</div>

		<h3>Menu</h3>
		<div class="menu">
			<router-link :to="{name: 'home'}" class="button">
				<span class="material-icons">home</span>
				<span class="text">Home</span>
			</router-link>
            <router-link to="/hof" class="button">
				<span class="material-icons">workspace_premium</span>
				<span class="text">HOF</span>
			</router-link>
			<router-link to="/platforms" class="button">
				<span class="material-icons">sports_esports</span>
				<span class="text">Vote - Platforms</span>
			</router-link>
		</div>

		<div class="flex"></div>
		
		<div class="menu">
            <router-link to="/about" class="button">
				<span class="material-icons">description</span>
				<span class="text">About</span>
			</router-link>
			<router-link to="/contact" class="button">
				<span class="material-icons">email</span>
				<span class="text">Contact</span>
			</router-link>
			<router-link to="/settings" class="button">
				<span class="material-icons">settings</span>
				<span class="text">Settings</span>
			</router-link>
		</div>
	</aside>
</template>

<script setup>
import { ref } from 'vue'
import logoURL from '../assets/logo.png'

const is_expanded = ref(localStorage.getItem("shrink") !== "true")

const ToggleMenu = () => {
	is_expanded.value = !is_expanded.value
	localStorage.setItem("shrink", is_expanded.value)
}
</script>

<style>
aside {
	position: fixed;
    display: flex;
    flex-direction: column;
    background-color: #1e293b;
    color: #f1f5f9;
    width: calc(2rem + 32px);
    overflow: hidden;
    min-height: 100vh;
    padding: 1rem;
    transition: 0.2s ease-in-out;
	z-index: 9;
}

aside .flex {
	flex: 1 1 0%;
}
aside .logo {
    margin-bottom: 1rem;
}
aside .logo img {
	width: 2rem;
}
aside .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
    position: relative;
    top: 0;
    transition: 0.2s ease-in-out;
}
aside .menu-toggle-wrap .menu-toggle {
	transition: 0.2s ease-in-out;
}
aside .menu-toggle-wrap .menu-toggle .material-icons {
	font-size: 2rem;
	color: #f1f5f9;
	transition: 0.2s ease-out;
}
 aside .menu-toggle-wrap .menu-toggle:hover .material-icons {
	color: #4ade80;
	transform: translateX(0.5rem);
}
 aside h3, aside h2.company-name, aside .button .text {
	opacity: 0;
	transition: opacity 0.3s ease-in-out;
}
 aside h3 {
	color: #64748b;
	font-size: 0.875rem;
	margin-bottom: 0.5rem;
	text-transform: uppercase;
}

aside h2.company-name {
	color: green;
	font-size: 1.2rem;
	margin-bottom: 0.5rem;
	text-transform: uppercase;
}

 aside .menu {
	margin: 0 -1rem;
}
 aside .menu .button {
	display: flex;
	align-items: center;
	text-decoration: none;
	transition: 0.2s ease-in-out;
	padding: 0.5rem 1rem;
}
 aside .menu .button .material-icons {
	font-size: 2rem;
	color: #f1f5f9;
	transition: 0.2s ease-in-out;
}
 aside .menu .button .text {
	color: #f1f5f9;
	transition: 0.2s ease-in-out;
}
 aside .menu .button:hover {
	background-color: #334155;
}
 aside .menu .button:hover .material-icons, aside .menu .button:hover .text {
	color: #4ade80;
}
 aside .menu .button.router-link-exact-active {
	background-color: #334155;
	border-right: 5px solid #4ade80;
}
 aside .menu .button.router-link-exact-active .material-icons, aside .menu .button.router-link-exact-active .text {
	color: #4ade80;
}
 aside .footer {
	opacity: 0;
	transition: opacity 0.3s ease-in-out;
}
 aside .footer p {
	font-size: 0.875rem;
	color: #64748b;
}
 aside.is-expanded {
	width: 300px;
}
 aside.is-expanded .menu-toggle-wrap {
	top: -3rem;
}
 aside.is-expanded .menu-toggle-wrap .menu-toggle {
	transform: rotate(-180deg);
}
 aside.is-expanded h3, aside.is-expanded h2.company-name, aside.is-expanded .button .text {
	opacity: 1;
}

 aside.is-expanded .button .material-icons {
	margin-right: 1rem;
}

 aside.is-expanded .footer {
	opacity: 0;
}
 
 aside.is-expanded + .content {
	margin-left: 300px;
	transition: 0.2s ease-in-out;
 }
</style>