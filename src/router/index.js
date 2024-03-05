import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/user/:id',
      name: 'user',
      component: () => import('../views/UserView.vue')
    },
    {
      path: '/add/:id?',
      name: 'add',
      component: () => import('../views/AddView.vue'),
      props: true
    }
  ]
})

export default router
