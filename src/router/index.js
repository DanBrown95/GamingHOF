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
    component: () => import('../views/SubmissionDetails.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
