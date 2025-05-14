<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-center p-5 box-border">
    <GameLogo />
    <h1 class="text-red-500 text-4xl font-bold mb-5">Game Over</h1>
    <p v-if="finalScore !== null" class="text-xl mb-7">
      Your final score: ${{ finalScore.toLocaleString() }}
    </p>
    <p v-else class="text-xl mb-7">Thank you for playing!</p>

    <div class="flex gap-4">
      <RouterLink
        to="/game"
        class="py-2.5 px-5 bg-blue-600 text-white no-underline rounded-md text-base transition-colors hover:bg-blue-700"
        >Play Again</RouterLink
      >
      <RouterLink
        to="/"
        class="py-2.5 px-5 bg-blue-600 text-white no-underline rounded-md text-base transition-colors hover:bg-blue-700"
        >Back to Home</RouterLink
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useGameStore } from '@/stores/GameStore'
import GameLogo from '@/components/GameLogo.vue'
import { RouterLink } from 'vue-router'

export default defineComponent({
  name: 'GameOverView',
  components: {
    GameLogo,
    RouterLink,
  },
  setup() {
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

    return {
      finalScore,
    }
  },
})
</script>
