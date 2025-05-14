<template>
  <div
    id="app"
    class="bg-gradient-to-br from-purple-900 via-purple-700 to-pink-700 text-gray-100 min-h-screen flex flex-col font-sans"
  >
    <header v-if="!isGameRoute" class="leading-normal max-h-screen p-4 border-b border-gray-700">
      <GameLogo />
      <nav class="w-full text-xs text-center mt-4">
        <RouterLink
          to="/"
          class="inline-block px-4 border-l border-gray-600 text-yellow-400 hover:text-yellow-300 first:border-l-0"
          >Home</RouterLink
        >
        <RouterLink
          to="/game"
          class="inline-block px-4 border-l border-gray-600 text-yellow-400 hover:text-yellow-300"
          >Play Game</RouterLink
        >
        <RouterLink
          to="/gameover"
          class="inline-block px-4 border-l border-gray-600 text-yellow-400 hover:text-yellow-300"
          >Game Over (Test)</RouterLink
        >
      </nav>
    </header>
    <RouterView class="flex-grow flex flex-col" />
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import GameLogo from '@/components/GameLogo.vue' // Corrected import name
import { computed } from 'vue'

const route = useRoute()
// Ensure game routes are correctly identified if more specific paths are needed
const isGameRoute = computed(() => route.path.startsWith('/game'))
</script>
