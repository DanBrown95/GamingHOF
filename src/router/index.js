import { createRouter, createWebHashHistory } from 'vue-router'

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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
