import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from "@auth0/auth0-vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue')
  },
  {
    path: '/submission/:id',
    name: 'submissionDetails',
    component: () => import(/* webpackChunkName: "about" */ '../views/SubmissionDetails.vue')
  },
  {
    path: '/creator/:id',
    name: 'creatorHome',
    component: () => import('../views/creator/CreatorHomeView.vue')
  },
  {
    path: '/creator/:platform',
    name: 'seeMore',
    component: () => import('../views/creator/CreatorHomeView.vue')
  },
  {
    path: '/HOF',
    name: 'hof',
    component: () => import('../views/HOF.vue')
  },
  {
    path: '/Platforms',
    name: 'platforms',
    component: () => import('../views/Platforms.vue')
  },
  {
    path: '/account',
    name: "account",
    component: () => import('../views/Account.vue'),
    beforeEnter: authGuard,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
