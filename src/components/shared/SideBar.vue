<template>
	<aside :class="`${is_expanded ? 'is-expanded' : ''}`">
		<popup-modal :showModal="showModal" @close="modalClosed"></popup-modal>

		<div class="logo">
			<router-link :to="{name: 'home'}">
				<img :src="logoUrl" alt="GamingHOF" />
			</router-link>
		</div>

		<div class="menu-toggle-wrap">
			<button class="menu-toggle" @click="ToggleMenu" :title="is_expanded ? 'Collapse' : 'Expand'">
				<span class="material-icons">keyboard_double_arrow_right</span>
			</button>
		</div>

		<p class="menu-label">Discover</p>
		<div class="menu">
			<router-link :to="{name: 'home'}" class="button">
				<span class="material-icons">home</span>
				<span class="text">Home</span>
			</router-link>
			<router-link :to="{name: 'hof'}" class="button">
				<span class="material-icons">workspace_premium</span>
				<span class="text">Hall of Fame</span>
			</router-link>
			<router-link :to="{name: 'leaderboard'}" class="button">
				<span class="material-icons">leaderboard</span>
				<span class="text">Leaderboard</span>
			</router-link>
			<router-link :to="{name: 'platforms'}" class="button">
				<span class="material-icons">sports_esports</span>
				<span class="text">Platforms</span>
			</router-link>
			<router-link :to="{name: 'archive'}" class="button">
				<span class="material-icons">history</span>
				<span class="text">Archive</span>
			</router-link>
			<router-link :to="{name: 'search'}" class="button">
				<span class="material-icons">search</span>
				<span class="text">Search</span>
			</router-link>
		</div>

		<div class="flex"></div>

		<div class="menu">
			<router-link v-if="isLoggedIn" :to="{name: 'submit'}" class="button submit-btn">
				<span class="material-icons">add_circle</span>
				<span class="text">Submit a Clip</span>
			</router-link>
			<router-link v-if="isLoggedIn" :to="{name: 'creatorHome', params: {id: '222222222'}}" class="button">
				<span class="material-icons">portrait</span>
				<span class="text">Your Channel</span>
			</router-link>
			<router-link v-if="isLoggedIn" :to="{name: 'account'}" class="button">
				<span class="material-icons">account_circle</span>
				<span class="text">Account</span>
			</router-link>
			<a v-if="!isLoggedIn" @click="Login" class="button">
				<span class="material-icons">login</span>
				<span class="text">Login</span>
			</a>
			<a v-if="isLoggedIn" @click="Logout" class="button">
				<span class="material-icons">logout</span>
				<span class="text">Logout</span>
			</a>
			<div class="divider"></div>
			<a @click="ShowSettings" class="button">
				<span class="material-icons">settings</span>
				<span class="text">Settings</span>
			</a>
		</div>
	</aside>
</template>

<script>
import { mapState } from 'vuex';
import logoURL from '../../assets/logo.png'
import smallLogoUrl from '../../assets/just-logo.png'

import PopupModal from "@/components/shared/PopupModal.vue"
import { useAuth0 } from '@auth0/auth0-vue';

export default {
	components: { PopupModal },
	computed: {
		...mapState({ isLoggedIn: state => state.isAuthenticated }),
		logoUrl() {
			return this.is_expanded ? logoURL : smallLogoUrl;
		}
	},
	data() {
		return {
			is_expanded: localStorage.getItem("shrink") !== "true",
			showModal: false,
			loginWithRedirect: null,
			logout: null,
			user: null,
			isAuthenticated: false
		};
	},
	methods: {
		Login() { this.loginWithRedirect(); },
		Logout() { this.logout({ logoutParams: { returnTo: window.location.origin } }); },
		ToggleMenu() {
			this.is_expanded = !this.is_expanded;
			localStorage.setItem("shrink", this.is_expanded);
		},
		ShowSettings() { this.showModal = true; },
		modalClosed() { this.showModal = false; },
	},
	created() {
		const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
		this.loginWithRedirect = loginWithRedirect;
		this.logout = logout;
		this.user = user;
		this.isAuthenticated = isAuthenticated;

		// DEV BYPASS: set localStorage key 'devAuth=true' to simulate logged-in state
		if (localStorage.getItem('devAuth') === 'true') {
			this.$store.dispatch('setIsAuthenticated', true);
			this.$store.dispatch('setUser', { name: 'Dev User', sub: 'dev|local-bypass' });
		}
	},
	watch: {
		user(newV) { this.$store.dispatch('setUser', newV); },
		isAuthenticated(newV) { this.$store.dispatch('setIsAuthenticated', newV); }
	}
};
</script>


<style>
/* ─── Sidebar shell ──────────────────────────────────────────── */
aside {
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	background-color: #1e293b;
	background-image: linear-gradient(180deg, #1e293b 0%, #162032 100%);
	color: #f1f5f9;
	width: var(--sidebar-collapsed, calc(2rem + 32px));
	overflow: hidden;
	min-height: 100vh;
	padding: 1.25rem 1rem;
	transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	z-index: 9;
	box-shadow: 4px 0 24px rgba(0, 0, 0, 0.25);
}

aside.is-expanded {
	width: var(--sidebar-expanded, 300px);
}

/* ─── Logo ───────────────────────────────────────────────────── */
aside .logo {
	margin-bottom: 1.5rem;
	align-self: center;
	display: flex;
	align-items: center;
	justify-content: center;
}

aside .logo img {
	width: 2.2rem;
	transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	display: block;
}

aside.is-expanded .logo img {
	width: 10rem;
}

/* ─── Expand toggle ──────────────────────────────────────────── */
aside .menu-toggle-wrap {
	display: flex;
	justify-content: flex-end;
	margin-bottom: 1.5rem;
}

aside .menu-toggle {
	transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

aside .menu-toggle .material-icons {
	font-size: 1.6rem;
	color: #64748b;
	transition: color 0.2s ease, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

aside .menu-toggle:hover .material-icons {
	color: #4ade80;
	transform: translateX(3px);
}

aside.is-expanded .menu-toggle .material-icons {
	transform: rotate(-180deg);
}

aside.is-expanded .menu-toggle:hover .material-icons {
	transform: rotate(-180deg) translateX(-3px);
}

/* ─── Section label ──────────────────────────────────────────── */
aside .menu-label {
	opacity: 0;
	font-size: 0.7rem;
	font-weight: 600;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	color: #475569;
	padding: 0 0.5rem;
	margin-bottom: 0.5rem;
	transition: opacity 0.25s ease;
	white-space: nowrap;
}

aside.is-expanded .menu-label {
	opacity: 1;
}

/* ─── Menu ───────────────────────────────────────────────────── */
aside .flex {
	flex: 1;
}

aside .menu {
	margin: 0 -1rem;
}

aside .menu .button {
	display: flex;
	align-items: center;
	padding: 0.6rem 1rem;
	transition: background-color 0.2s ease, color 0.2s ease;
	white-space: nowrap;
	cursor: pointer;
}

aside .menu .button .material-icons {
	font-size: 1.5rem;
	color: #94a3b8;
	flex-shrink: 0;
	transition: color 0.2s ease;
}

aside .menu .button .text {
	color: #cbd5e1;
	font-size: 0.875rem;
	font-weight: 500;
	opacity: 0;
	margin-left: 0;
	width: 0;
	overflow: hidden;
	transition: opacity 0.25s ease, margin-left 0.3s ease, width 0.3s ease;
}

aside.is-expanded .menu .button .text {
	opacity: 1;
	margin-left: 0.875rem;
	width: auto;
}

aside .menu .button:hover {
	background-color: rgba(255, 255, 255, 0.05);
}

aside .menu .button:hover .material-icons,
aside .menu .button:hover .text {
	color: #4ade80;
}

aside .menu .button.router-link-exact-active {
	background-color: rgba(74, 222, 128, 0.1);
	border-right: 3px solid #4ade80;
}

aside .menu .button.router-link-exact-active .material-icons,
aside .menu .button.router-link-exact-active .text {
	color: #4ade80;
}

/* Submit button accent */
aside .menu .submit-btn .material-icons {
	color: #4ade80;
}

/* ─── Divider ────────────────────────────────────────────────── */
aside .divider {
	height: 1px;
	background: rgba(255,255,255,0.06);
	margin: 0.5rem 1rem;
}

/* ─── Content shift ──────────────────────────────────────────── */
aside.is-expanded + .content {
	margin-left: var(--sidebar-expanded, 300px);
}
</style>
