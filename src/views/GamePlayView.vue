<template>
  <div class="p-5 flex flex-col items-center min-h-[calc(100vh-40px)] box-border">
    <div class="flex w-full max-w-6xl gap-5 md:flex-row flex-col-reverse">
      <div class="flex-grow md:w-3/4 flex flex-col">
        <GameLogo v-if="!isMobile" />
        <QuestionTimer />
        <QuestionDisplay />
        <AnswerButtons />
        <LifelinesDisplay />
        <LifelineFeedback />

        <div class="flex justify-around mt-5">
          <button
            @click="confirmAndProceed"
            :disabled="!gameStore.selectedAnswerId || gameStore.isCorrect !== null"
            class="py-2.5 px-5 text-base bg-cyan-600 text-white border-none rounded-md cursor-pointer hover:not(:disabled):bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {{ $t('confirmAnswer') }}
          </button>
          <button
            @click="resetAndStartGame"
            class="py-2.5 px-5 text-base bg-teal-600 text-white border-none rounded-md cursor-pointer hover:not(:disabled):bg-teal-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {{ $t('newGame') }}
          </button>
        </div>

        <div
          v-if="gameStore.gameStatus === 'gameOver'"
          class="mt-7 p-5 bg-black bg-opacity-70 rounded-lg text-center"
        >
          <h2 class="text-red-500 text-2xl font-bold">{{ $t('gameOver') }}</h2>
          <p class="text-lg">{{ $t('yourFinalScore') }} ${{ gameStore.score.toLocaleString() }}</p>
          <RouterLink
            to="/"
            class="inline-block mt-4 py-2.5 px-4 bg-blue-600 text-white no-underline rounded-md hover:bg-blue-700"
            >{{ $t('backToHome') }}</RouterLink
          >
        </div>
        <div
          v-if="gameStore.gameStatus === 'finished'"
          class="mt-7 p-5 bg-black bg-opacity-70 rounded-lg text-center"
        >
          <h2 class="text-green-500 text-2xl font-bold">{{ $t('congratulations') }}</h2>
          <p class="text-lg">{{ $t('youWon') }} ${{ gameStore.score.toLocaleString() }}</p>
          <RouterLink
            to="/"
            class="inline-block mt-4 py-2.5 px-4 bg-blue-600 text-white no-underline rounded-md hover:bg-blue-700"
            >{{ $t('backToHome') }}</RouterLink
          >
        </div>
      </div>
      <div class="md:w-1/4 md:max-w-xs bg-black bg-opacity-30 p-4 rounded-lg">
        <MoneyLadder />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import GameLogo from '@/components/GameLogo.vue'
import MoneyLadder from '@/components/MoneyLadder.vue'
import QuestionTimer from '@/components/QuestionTimer.vue'
import QuestionDisplay from '@/components/QuestionDisplay.vue'
import AnswerButtons from '@/components/AnswerButtons.vue'
import LifelinesDisplay from '@/components/LifelinesDisplay.vue'
import LifelineFeedback from '@/components/LifelineFeedback.vue'
import { useGameStore } from '@/stores/GameStore'
import { useTimerStore } from '@/stores/TimerStore'

export default defineComponent({
  name: 'GamePlayView',
  components: {
    GameLogo,
    MoneyLadder,
    QuestionTimer,
    QuestionDisplay,
    AnswerButtons,
    LifelinesDisplay,
    LifelineFeedback,
  },
  setup() {
    const gameStore = useGameStore()
    const timerStore = useTimerStore()
    const router = useRouter()

    const isMobile = ref(window.innerWidth < 768) // Simple check for mobile
    window.addEventListener('resize', () => (isMobile.value = window.innerWidth < 768))

    const startGame = () => {
      gameStore.startGame()
      if (gameStore.currentQuestion) {
        timerStore.startTimer(120) // Initial timer start for the first question
      }
    }

    const confirmAndProceed = async () => {
      if (!gameStore.selectedAnswerId || gameStore.isCorrect !== null) return

      gameStore.confirmAnswer()
      timerStore.stopTimer() // Stop timer during confirmation and before next question

      // Wait a bit to show correctness before proceeding
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (gameStore.isCorrect) {
        if (gameStore.gameStatus === 'finished') {
          // Game finished (e.g., won the million)
          // Navigation to a finished screen or message handled by template
        } else {
          gameStore.nextQuestion()
          if (gameStore.currentQuestion && gameStore.gameStatus === 'playing') {
            timerStore.startTimer(120) // Start timer for the new question
          }
        }
      } else {
        // Game over, isCorrect is false
        // Navigation to game over screen or message handled by template
        router.push('/gameover')
      }
    }

    const resetAndStartGame = () => {
      timerStore.resetTimer()
      gameStore.resetGame()
      startGame()
    }

    onMounted(() => {
      if (gameStore.gameStatus !== 'playing' || !gameStore.currentQuestion) {
        startGame()
      }
    })

    watch(
      () => gameStore.gameStatus,
      (newStatus) => {
        if (newStatus === 'gameOver') {
          timerStore.stopTimer()
          // Optional: Delay before redirecting to GameOverView
          // setTimeout(() => router.push('/gameover'), 2000);
        } else if (newStatus === 'finished') {
          timerStore.stopTimer()
          // Optional: Display a success message or navigate
        }
      },
    )

    // Watch for timer running out
    watch(
      () => timerStore.timeLeft,
      (newTime) => {
        if (newTime === 0 && gameStore.gameStatus === 'playing' && !gameStore.selectedAnswerId) {
          // Time ran out, player didn't select an answer
          gameStore.gameStatus = 'gameOver' // Set game to over
          timerStore.stopTimer()
          // No answer was selected, so it's effectively a wrong answer or loss
          // You might want to set score or specific state here
          router.push('/gameover')
        }
      },
    )

    return {
      gameStore,
      confirmAndProceed,
      resetAndStartGame,
      isMobile,
    }
  },
})
</script>
