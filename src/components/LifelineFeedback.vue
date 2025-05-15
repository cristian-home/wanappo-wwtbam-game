<template>
  <div
    v-if="feedbackMessage"
    class="mt-2.5 p-2.5 bg-yellow-500 bg-opacity-20 text-yellow-400 rounded-md text-center italic"
  >
    <p>{{ feedbackMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '../stores/GameStore'

const gameStore = useGameStore()
const feedbackMessage = computed(() => gameStore.lifelineFeedback)
</script>
