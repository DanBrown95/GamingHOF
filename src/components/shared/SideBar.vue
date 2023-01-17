
<template>
	<aside :class="`${is_expanded ? 'is-expanded' : ''}`">
		<popup-modal :showModal="showModal" @close="modalClosed"></popup-modal>

		<div class="logo">
			<router-link :to="{name: 'home'}">
				<img :src="is_expanded ? logoURL : smallLogoUrl" alt="Vue" /> 
			</router-link>
		</div>

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
            <router-link :to="{name: 'hof'}" class="button">
				<span class="material-icons">workspace_premium</span>
				<span class="text">HOF</span>
			</router-link>
			<router-link :to="{name: 'platforms'}" class="button">
				<span class="material-icons">sports_esports</span>
				<span class="text">Vote - Platforms</span>
			</router-link>
		</div>

		<div class="flex"></div>
		
		<div class="menu">
			<router-link v-if="isLoggedIn" to="/myChannel" class="button">
				<span class="material-icons">portrait</span>
				<span class="text">Your Channel</span>
			</router-link>
			<router-link v-if="isLoggedIn" to="/account" class="button">
				<span class="material-icons">account_circle</span>
				<span class="text">Account</span>
			</router-link>
            <a v-if="!isLoggedIn" @click="Login" class="button">
				<span class="material-icons">login</span>
				<span class="text">Login</span>
			</a>
			<router-link v-if="!isLoggedIn" to="/signup" class="button">
				<span class="material-icons">login</span>
				<span class="text">Signup</span>
			</router-link>
			<a v-if="isLoggedIn" @click="Logout" class="button">
				<span class="material-icons">logout</span>
				<span class="text">Logout</span>
			</a>
			<hr />
			<a to="/settings" @click="ShowSettings" class="button">
				<span class="material-icons">settings</span>
				<span class="text">Settings</span>
			</a>
		</div>
	</aside>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex';
import { mapState } from 'vuex';
import logoURL from '../../assets/logo.png'
import smallLogoUrl from '../../assets/just-logo.png'

import PopupModal from "@/components/shared/PopupModal.vue"

export default {
	components: {
		PopupModal
	},
	computed: mapState({
		isLoggedIn: state => state.isLoggedIn,
	}),
	setup() {
		const store = useStore();
		const is_expanded = ref(localStorage.getItem("shrink") !== "true")
		const Login = () => {
			store.dispatch('login');
		};

		const Logout = () => {
			store.dispatch('logout');
		};

		const ToggleMenu = () => {
			is_expanded.value = !is_expanded.value
			localStorage.setItem("shrink", is_expanded.value)
		};

		const showModal = ref(false)
		const ShowSettings = () => {
			showModal.value = true;
		}

		const modalClosed = () => {
			showModal.value = false
		}

		return { Login, Logout, ToggleMenu, logoURL, smallLogoUrl, is_expanded, ShowSettings, showModal, modalClosed };
	}
};
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
	align-self: center;
}
aside .logo img {
	width: 3em;
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

aside.is-expanded .logo img {
	width: 11em;
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

 a:hover {
	cursor: pointer;
 }
</style>