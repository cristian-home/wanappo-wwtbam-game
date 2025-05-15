<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useGameStore } from '../stores/GameStore'
import GameLogo from '@/components/GameLogo.vue'
import { onBeforeRouteLeave, RouterLink } from 'vue-router'
import SolarPlayBoldDuotone from '~icons/solar/play-bold-duotone'
import AntDesignHomeTwotone from '~icons/ant-design/home-twotone'
import { useMotion } from '@vueuse/motion'
import { motions } from '@/motions'

const gameStore = useGameStore()
const finalScore = computed(() => gameStore.score)

const container = ref<HTMLElement>()
const { leave: leaveContainer } = useMotion(container, motions.appear)

onMounted(() => {
  // Ensure game state is properly set to gameOver if not already
  // This view might be navigated to directly or from game logic
  if (gameStore.gameStatus !== 'gameOver' && gameStore.gameStatus !== 'finished') {
    // If the game didn't naturally end, we can set a default or redirect
    // For now, we just display the score if available
  }
})

onBeforeRouteLeave((to, from, next) => {
  leaveContainer(() => {
    next()
  })
})
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen text-center p-5 box-border"
    ref="container"
  >
    <GameLogo class="w-64 h-64" />
    <h1 class="text-yellow-300 text-4xl font-bold mb-5">{{ $t('gameOver') }}</h1>
    <p v-if="finalScore !== null" class="text-xl mb-7">
      {{ $t('yourFinalScore') }} {{ finalScore.toLocaleString() }} {{ $t('points') }}
    </p>
    <p v-else class="text-xl mb-7">{{ $t('thankYouForPlaying') }}</p>

    <div class="flex gap-4">
      <RouterLink
        to="/game"
        class="cursor-pointer flex gap-4 p-4 bg-black border-2 border-gray-900 text-white font-bold text-lg rounded-lg shadow-md hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-300 ease-in-out items-center justify-center"
      >
        <SolarPlayBoldDuotone />
        <span>{{ $t('playAgain') }}</span>
      </RouterLink>
      <RouterLink
        to="/"
        class="cursor-pointer flex gap-4 p-4 bg-black border-2 border-gray-900 text-white font-bold text-lg rounded-lg shadow-md hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-300 ease-in-out items-center justify-center"
      >
        <AntDesignHomeTwotone />
        <span>{{ $t('backToHome') }}</span>
      </RouterLink>
    </div>
  </div>
</template>
