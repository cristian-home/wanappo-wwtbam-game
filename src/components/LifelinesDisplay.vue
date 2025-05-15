<template>
  <div class="mb-5 text-center">
    <h4 class="mt-0 mb-2.5 text-white text-lg font-semibold">{{ $t('lifelines') }}</h4>
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
        :class="{ 'line-through bg-gray-700 text-gray-400': !lifeline.available }"
        :title="lifeline.available ? '' : $t('lifelineNotAvailable', [lifeline.id])"
      >
        {{
          lifeline.id === '50-50'
            ? $t('fiftyFifty')
            : lifeline.id === 'ask-audience'
              ? $t('askAudience')
              : lifeline.name
        }}
      </button>
    </div>
    <div v-if="anyLifelineUsed" class="text-xs text-yellow-400 mt-2">
      {{ $t('lifelineUsageReminder') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore, type Lifeline } from '../stores/GameStore'

const gameStore = useGameStore()
const lifelines = computed(() => gameStore.lifelines as Lifeline[])
const anyLifelineUsed = computed(() => gameStore.lifelines.some((lifeline) => !lifeline.available))

const useLifeline = (lifelineId: string) => {
  gameStore.useLifeline(lifelineId)
}
</script>
