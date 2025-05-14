import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GamePlayView from '../views/GamePlayView.vue'
import GameOverView from '../views/GameOverView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/game',
      name: 'gameplay',
      component: GamePlayView,
    },
    {
      path: '/gameover',
      name: 'gameover',
      component: GameOverView,
    },
  ],
})

export default router
