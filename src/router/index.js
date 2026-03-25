import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '@auth0/auth0-vue'
import HomeView from '../views/HomeView.vue'

const routes = [
  { path: '/',               name: 'home',            component: HomeView },
  { path: '/submission/:id', name: 'submissionDetails', component: () => import('../views/SubmissionDetails.vue') },
  { path: '/creator/:id',    name: 'creatorHome',     component: () => import('../views/creator/CreatorHomeView.vue') },
  { path: '/seeMore/:platform', name: 'seeMore',      component: () => import('../views/creator/CreatorHomeView.vue') },
  { path: '/hof',            name: 'hof',             component: () => import('../views/HOF.vue') },
  { path: '/platforms',      name: 'platforms',       component: () => import('../views/PlatformsHome.vue') },
  { path: '/leaderboard',    name: 'leaderboard',     component: () => import('../views/LeaderboardView.vue') },
  { path: '/search',         name: 'search',          component: () => import('../views/SearchView.vue') },
  { path: '/submit',         name: 'submit',          component: () => import('../views/SubmitView.vue') },
  { path: '/archive',        name: 'archive',         component: () => import('../views/ArchiveView.vue') },
  { path: '/game/:id',       name: 'game',            component: () => import('../views/GameView.vue') },
  { path: '/account',        name: 'account',         component: () => import('../views/AccountHome.vue'), beforeEnter: authGuard },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

export default router
