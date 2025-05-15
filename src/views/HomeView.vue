<script setup lang="ts">
import { RouterLink } from 'vue-router'
import GameLogo from '../components/GameLogo.vue'
</script>

<template>
  <main class="w-full flex-grow flex flex-col items-center justify-center">
    <GameLogo class="w-80 h-80" />
    <RouterLink
      to="/game"
      class="inline-block px-4 border-l border-gray-600 text-yellow-400 hover:text-yellow-300"
    >
      {{ $t('playGame') }}
    </RouterLink>
  </main>
</template>
