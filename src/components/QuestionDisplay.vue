<template>
  <div
    class="p-5 mb-5 bg-black bg-opacity-50 text-white rounded-lg text-center text-2xl min-h-[100px] flex items-center justify-center"
  >
    <p v-if="currentQuestion">{{ currentQuestion.text }}</p>
    <p v-else>Loading question...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useGameStore } from '@/stores/GameStore'

export default defineComponent({
  name: 'QuestionDisplay',
  setup() {
    const gameStore = useGameStore()
    const currentQuestion = computed(() => gameStore.getCurrentQuestionData)

    return {
      currentQuestion,
    }
  },
})
</script>
