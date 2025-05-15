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

  if (fiftyFiftyActive.value) {
    const correctAnswer = currentQuestion.value.options.find(
      (opt: QuestionOption) => opt.id === currentQuestion.value!.correctAnswerId,
    )

    const incorrectOptions = currentQuestion.value.options.filter(
      (opt: QuestionOption) => opt.id !== currentQuestion.value!.correctAnswerId,
    )

    // Calculate how many options to keep - always keep 50% (rounded up if odd)
    // For example: with 4 options, keep 2; with 5 options, keep 3
    const totalOptionsToShow = Math.ceil(currentQuestion.value.options.length / 2)

    // We always include the correct answer, so we need (totalOptionsToShow - 1) incorrect options
    const incorrectOptionsToShow = Math.max(0, totalOptionsToShow - 1)

    // Shuffle incorrect options and pick the number we need
    const shuffledIncorrectOptions = [...incorrectOptions].sort(() => 0.5 - Math.random())
    const selectedIncorrectOptions = shuffledIncorrectOptions.slice(0, incorrectOptionsToShow)

    // Combine correct answer with selected incorrect options
    const finalOptions = [correctAnswer, ...selectedIncorrectOptions].filter(
      (opt: QuestionOption | undefined) => opt !== undefined,
    ) as QuestionOption[]

    // Shuffle the final options so the correct answer isn't always in the same position
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
    if (optionId === currentQuestion.value.correctAnswerId) return 'correct'
    if (optionId === selectedAnswerId.value && !isCorrect.value) return 'wrong'
  }

  if (selectedAnswerId.value === optionId) return 'selected'

  if (isAnswerSelected.value && selectedAnswerId.value !== optionId) return 'opacity-90'

  return ''
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

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-5">
    <button
      v-for="option in visibleOptions"
      :key="option.id"
      @click="selectAnswer(option.id)"
      :disabled="isAnswerSelected || isConfirmed"
      class="btn"
      :class="getButtonClass(option.id)"
    >
      <span class="w-full h-full flex flex-col justify-center">
        {{ option.text }}
      </span>
    </button>
  </div>
</template>

<style lang="css" scoped>
.btn {
  filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.6));
  transition: all 0.3s ease-in-out;
}

/* .btn:disabled {
  filter: drop-shadow(0px 0px 0px rgba(0, 0, 0, 0));
}

.btn:disabled span {
  opacity: 0.9;
} */

.btn span {
  position: relative;
  color: #fff;
  font-weight: 500;
  text-decoration: none;
  padding: 15px 50px;
  text-align: center;
  clip-path: polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%);
  background-color: #161213;
  cursor: pointer;
  background-image: radial-gradient(
    200% 70% at center 20%,
    rgb(44, 37, 49) -30%,
    rgb(44, 37, 49) -30%,
    rgba(22, 18, 19, 1) 50%,
    rgba(22, 18, 19, 1) 150%
  );
  background-repeat: no-repeat;
  transition: all 0.3s ease-in-out;
}

.btn.correct {
  filter: drop-shadow(-5px 0px 10px rgba(0, 255, 51, 0.6))
    drop-shadow(5px 0px 10px rgba(0, 255, 51, 0.6));
}

.btn.wrong {
  filter: drop-shadow(-5px 0px 10px rgba(255, 17, 0, 0.6))
    drop-shadow(5px 0px 10px rgba(255, 17, 0, 0.6));
}

.btn.selected {
  filter: drop-shadow(-5px 0px 10px rgba(255, 153, 0, 0.792))
    drop-shadow(5px 0px 10px rgba(255, 153, 0, 0.792));
}
</style>
