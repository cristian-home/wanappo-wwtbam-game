<template>
  <div class="mb-5 text-center">
    <h4 class="mt-0 mb-2.5 text-white text-lg font-semibold">Lifelines</h4>
    <div class="flex justify-center gap-2.5">
      <button
        v-for="lifeline in lifelines"
        :key="lifeline.id"
        @click="useLifeline(lifeline.id)"
        :disabled="
          !lifeline.available ||
          gameStore.selectedAnswerId !== null ||
          gameStore.gameStatus !== 'playing'
        "
        class="py-2.5 px-4 bg-gray-600 text-white border-none rounded-md cursor-pointer hover:not(:disabled):bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
        :class="{ 'line-through bg-gray-700': !lifeline.available }"
      >
        {{ lifeline.name }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useGameStore, type Lifeline } from '@/stores/GameStore'

export default defineComponent({
  name: 'LifelinesDisplay',
  setup() {
    const gameStore = useGameStore()
    const lifelines = computed(() => gameStore.lifelines as Lifeline[])

    const useLifeline = (lifelineId: string) => {
      gameStore.useLifeline(lifelineId)
    }

    return {
      lifelines,
      useLifeline,
      gameStore, // to disable buttons based on game state
    }
  },
})
</script>
