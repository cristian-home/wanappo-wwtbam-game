<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-center p-5 box-border">
    <GameLogo class="w-48 h-48" />
    <h1 class="text-red-500 text-4xl font-bold mb-5">{{ $t('gameOver') }}</h1>
    <p v-if="finalScore !== null" class="text-xl mb-7">
      {{ $t('yourFinalScore') }} {{ finalScore.toLocaleString() }} {{ $t('points') }}
    </p>
    <p v-else class="text-xl mb-7">{{ $t('thankYouForPlaying') }}</p>

    <div class="flex gap-4">
      <RouterLink
        to="/game"
        class="py-2.5 px-5 bg-blue-600 text-white no-underline rounded-md text-base transition-colors hover:bg-blue-700"
        >{{ $t('playAgain') }}</RouterLink
      >
      <RouterLink
        to="/"
        class="py-2.5 px-5 bg-blue-600 text-white no-underline rounded-md text-base transition-colors hover:bg-blue-700"
        >{{ $t('backToHome') }}</RouterLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useGameStore } from '../stores/GameStore'
import GameLogo from '@/components/GameLogo.vue'
import { RouterLink } from 'vue-router'

const gameStore = useGameStore()
const finalScore = computed(() => gameStore.score)

onMounted(() => {
  // Ensure game state is properly set to gameOver if not already
  // This view might be navigated to directly or from game logic
  if (gameStore.gameStatus !== 'gameOver' && gameStore.gameStatus !== 'finished') {
    // If the game didn't naturally end, we can set a default or redirect
    // For now, we just display the score if available
  }
})
</script>
