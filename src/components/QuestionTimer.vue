<template>
  <div class="text-xl font-bold text-yellow-400 text-center mb-4">
    <p>{{ $t('timeLeft') }} {{ formattedTimeLeft }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, onUnmounted } from 'vue'
import { useTimerStore } from '../stores/TimerStore'
import { useGameStore } from '../stores/GameStore'

const timerStore = useTimerStore()
const gameStore = useGameStore()

const formattedTimeLeft = computed(() => {
  const totalSeconds = timerStore.timeLeft
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const paddedMinutes = String(minutes).padStart(2, '0')
  const paddedSeconds = String(seconds).padStart(2, '0')
  return `${paddedMinutes}:${paddedSeconds}`
})

watch(
  () => gameStore.gameStatus,
  (newStatus) => {
    if (newStatus === 'playing' && gameStore.currentQuestion) {
      if (!timerStore.isRunning || timerStore.timeLeft === 0) {
        timerStore.startTimer(120) // Start with 120 seconds or a configured time
      }
    } else if (newStatus !== 'playing') {
      timerStore.stopTimer()
    }
  },
)

watch(
  () => timerStore.timeLeft,
  (newTimeLeft) => {
    if (newTimeLeft === 0 && gameStore.gameStatus === 'playing' && !gameStore.selectedAnswerId) {
      // Time ran out before an answer was selected
      gameStore.gameStatus = 'gameOver' // Or handle time out specifically
      // Potentially auto-select a wrong answer or just end game
    }
  },
)

// Ensure timer stops if component is unmounted while running
onUnmounted(() => {
  timerStore.stopTimer()
})
</script>
