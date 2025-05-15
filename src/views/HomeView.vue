<script setup lang="ts">
import { useRouter } from 'vue-router'
import GameLogo from '../components/GameLogo.vue'

const router = useRouter()

const playNewGame = () => {
  router.push({ name: 'gameplay' })
}
</script>

<template>
  <main class="w-full flex-grow flex flex-col items-center justify-center">
    <GameLogo class="w-80 h-80" />
    <button
      class="cursor-pointer inline-block px-4 border-l border-gray-600 text-yellow-400 hover:text-yellow-300"
      @click="playNewGame"
    >
      {{ $t('playGame') }}
    </button>
  </main>
</template>
