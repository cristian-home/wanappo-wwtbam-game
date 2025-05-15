<template>
  <div
    class="p-5 mb-5 bg-black bg-opacity-50 text-white rounded-lg text-center text-2xl min-h-[100px] flex items-center justify-center"
  >
    <p v-if="currentQuestion">{{ currentQuestion.text }}</p>
    <p v-else>{{ $t('loadingQuestion') }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/GameStore'

const gameStore = useGameStore()
const currentQuestion = computed(() => gameStore.getCurrentQuestionData)
</script>
