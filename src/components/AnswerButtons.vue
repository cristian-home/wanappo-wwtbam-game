<template>
  <div class="grid grid-cols-2 gap-2.5 mb-5">
    <button
      v-for="option in visibleOptions"
      :key="option.id"
      @click="selectAnswer(option.id)"
      :disabled="isAnswerSelected || isConfirmed"
      class="p-4 text-lg bg-blue-600 text-white border-none rounded-md cursor-pointer transition-colors duration-300 transform active:scale-95 disabled:bg-gray-600 disabled:cursor-not-allowed hover:not(:disabled):bg-blue-800"
      :class="getButtonClass(option.id)"
    >
      {{ option.text }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useGameStore } from '../stores/GameStore'
import { useTimerStore } from '../stores/TimerStore'
import type { QuestionOption } from '../stores/QuestionStore'

const gameStore = useGameStore()
const timerStore = useTimerStore()

const currentQuestion = computed(() => gameStore.currentQuestion)
const selectedAnswerId = computed(() => gameStore.selectedAnswerId)
const isCorrect = computed(() => gameStore.isCorrect)
const gameStatus = computed(() => gameStore.gameStatus)
const isConfirmed = ref(false)

const isAnswerSelected = computed(() => selectedAnswerId.value !== null)

const fiftyFiftyActive = computed(() => {
  return gameStore.fiftyFiftyActiveForCurrentQuestion
})

const visibleOptions = computed(() => {
  if (!currentQuestion.value) return []
  if (fiftyFiftyActive.value && currentQuestion.value.options.length === 4) {
    const correctAnswer = currentQuestion.value.options.find(
      (opt: QuestionOption) => opt.id === currentQuestion.value!.correctAnswerId,
    )
    const incorrectOptions = currentQuestion.value.options.filter(
      (opt: QuestionOption) => opt.id !== currentQuestion.value!.correctAnswerId,
    )
    // Shuffle incorrect options to pick one randomly
    const shuffledIncorrectOptions = [...incorrectOptions].sort(() => 0.5 - Math.random())
    const randomIncorrectOption = shuffledIncorrectOptions[0]

    const finalOptions = [correctAnswer, randomIncorrectOption].filter(
      (opt: QuestionOption | undefined) => opt !== undefined,
    ) as QuestionOption[]
    return finalOptions.sort(() => 0.5 - Math.random())
  }
  return currentQuestion.value.options
})

const selectAnswer = (optionId: string) => {
  if (isAnswerSelected.value || gameStatus.value !== 'playing') return
  gameStore.selectAnswer(optionId)
  timerStore.stopTimer()
}

const getButtonClass = (optionId: string) => {
  if (isConfirmed.value && currentQuestion.value) {
    if (optionId === currentQuestion.value.correctAnswerId) return 'bg-green-500 text-white'
    if (optionId === selectedAnswerId.value && !isCorrect.value) return 'bg-red-500 text-white'
  }
  if (selectedAnswerId.value === optionId) return 'bg-yellow-400 text-black'
  return 'bg-blue-600 hover:not(:disabled):bg-blue-700'
}

watch(isCorrect, (newVal) => {
  if (newVal !== null) {
    isConfirmed.value = true
  }
})

watch(currentQuestion, () => {
  isConfirmed.value = false
})
</script>

<!-- Style block removed as Tailwind classes are used -->
