import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/gameplay',
      name: 'gameplay',
      component: () => import('../views/GamePlayView.vue'),
    },
    {
      path: '/gameover',
      name: 'gameover',
      component: () => import('../views/GameOverView.vue'),
    },
  ],
})

export default router
