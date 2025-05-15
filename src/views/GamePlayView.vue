<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import GameLogo from '@/components/GameLogo.vue'
import MoneyLadder from '@/components/MoneyLadder.vue'
import QuestionTimer from '@/components/QuestionTimer.vue'
import QuestionDisplay from '@/components/QuestionDisplay.vue'
import AnswerButtons from '@/components/AnswerButtons.vue'
import LifelinesDisplay from '@/components/LifelinesDisplay.vue'
// import LifelineFeedback from '@/components/LifelineFeedback.vue'
import { useGameStore } from '../stores/GameStore'
import { useTimerStore } from '../stores/TimerStore'
import QlementineIconsNew16 from '~icons/qlementine-icons/new-16'
import { useMotion } from '@vueuse/motion'
import { motions } from '@/motions'
import { deepMerge } from '@/utils/objects'

const gameStore = useGameStore()
const timerStore = useTimerStore()
const router = useRouter()

const header = ref<HTMLElement>()
const questionPanel = ref<HTMLElement>()
const ladder = ref<HTMLElement>()

const { leave: leaveHeader } = useMotion(header, motions.appear)
const { leave: leavePanel } = useMotion(
  questionPanel,
  deepMerge(motions.appear, { enter: { transition: { delay: 500 } } }),
)
const { leave: leaveLadder } = useMotion(ladder, motions.slideLeftIn)

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

onBeforeRouteLeave((to, from, next) => {
  // If going to gameover or gameStatus is not 'playing', play the animations and continue
  if (gameStore.gameStatus !== 'playing') {
    Promise.all([
      new Promise((resolve) => leaveHeader(() => resolve(true))),
      new Promise((resolve) => leavePanel(() => resolve(true))),
      new Promise((resolve) => leaveLadder(() => resolve(true))),
    ]).finally(() => {
      next()
    })
  } else {
    router.push({ name: 'gameplay' })
  }
})
</script>

<template>
  <div class="main-container h-full w-full p-4 overflow-hidden">
    <div class="Header flex flex-row gap-4 justify-between" ref="header">
      <QuestionTimer />
      <GameLogo class="min-h-1" />
      <LifelinesDisplay />
      <!-- <LifelineFeedback /> -->
    </div>
    <div class="QuestionPanel" ref="questionPanel">
      <QuestionDisplay />
      <AnswerButtons />
      <button
        @click="confirmAndProceed"
        :disabled="!gameStore.selectedAnswerId || gameStore.isCorrect !== null"
        class="py-2.5 px-5 text-base bg-cyan-600 text-white border-none rounded-md cursor-pointer hover:not(:disabled):bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        {{ $t('confirmAnswer') }}
      </button>
      <div
        v-if="gameStore.gameStatus === 'gameOver'"
        class="mt-7 p-5 bg-black bg-opacity-70 rounded-lg text-center"
      >
        <h2 class="text-red-500 text-2xl font-bold">{{ $t('gameOver') }}</h2>
        <p class="text-lg">
          {{ $t('yourFinalScore') }} {{ gameStore.score.toLocaleString() }} {{ $t('points') }}
        </p>
        <RouterLink
          to="/"
          class="inline-block mt-4 py-2.5 px-4 bg-blue-600 text-white no-underline rounded-md hover:bg-blue-700"
        >
          {{ $t('backToHome') }}
        </RouterLink>
      </div>
      <div
        v-if="gameStore.gameStatus === 'finished'"
        class="mt-7 p-5 bg-black bg-opacity-70 rounded-lg text-center"
      >
        <h2 class="text-green-500 text-2xl font-bold">{{ $t('congratulations') }}</h2>
        <p class="text-lg">
          {{ $t('youWon') }} {{ gameStore.score.toLocaleString() }} {{ $t('points') }}
        </p>
        <RouterLink
          to="/"
          class="inline-block mt-4 py-2.5 px-4 bg-blue-600 text-white no-underline rounded-md hover:bg-blue-700"
        >
          {{ $t('backToHome') }}
        </RouterLink>
      </div>
    </div>
    <div
      ref="ladder"
      class="PrizeLadder bg-black bg-opacity-30 rounded-lg flex flex-col items-stretch p-4 gap-4"
    >
      <MoneyLadder class="min-h-1" />
      <div class="w-full rounded-lg border-gray-50 flex flex-col items-stretch">
        <button
          @click="resetAndStartGame"
          class="cursor-pointer flex gap-4 p-4 bg-black border-2 border-gray-900 text-white font-bold text-lg rounded-lg shadow-md hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-300 ease-in-out items-center justify-center"
        >
          <QlementineIconsNew16 />
          {{ $t('newGame') }}
        </button>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
.main-container {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 8rem 1fr 1fr;
  grid-auto-flow: row;
  grid-template-areas:
    'Header Header Header Header'
    'QuestionPanel QuestionPanel QuestionPanel PrizeLadder'
    'QuestionPanel QuestionPanel QuestionPanel PrizeLadder';
}

/* medaquery using tailwind values */
@media (min-width: 768px) {
  .main-container {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 15rem 1fr 1fr;
    grid-auto-flow: column;
    grid-template-areas:
      'Header Header Header PrizeLadder'
      'QuestionPanel QuestionPanel QuestionPanel PrizeLadder';
  }
}

.PrizeLadder {
  grid-area: PrizeLadder;
}

.QuestionPanel {
  grid-area: QuestionPanel;
}

.Header {
  grid-area: Header;
}
</style>
