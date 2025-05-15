import { defineStore } from 'pinia'
import { useQuestionStore, type Question } from './QuestionStore'
import i18n from '../i18n'

export interface Lifeline {
  id: string
  name: string
  available: boolean
}

export interface MoneyLadderItem {
  level: number
  amount: number
}

export const useGameStore = defineStore('game', {
  state: () => ({
    currentQuestionIndex: 0,
    currentQuestion: null as Question | null,
    selectedAnswerId: null as string | null,
    isCorrect: null as boolean | null,
    lifelines: [
      { id: '50-50', name: '50:50', available: true },
      { id: 'ask-audience', name: 'Ask the Audience', available: true },
    ] as Lifeline[],
    score: 0,
    gameStatus: 'pending' as 'pending' | 'playing' | 'paused' | 'finished' | 'gameOver',
    moneyLadder: [
      { level: 1, amount: 100 },
      { level: 2, amount: 200 },
      { level: 3, amount: 300 },
      { level: 4, amount: 500 },
      { level: 5, amount: 1000 },
      { level: 6, amount: 2000 },
      { level: 7, amount: 4000 },
      { level: 8, amount: 8000 },
      { level: 9, amount: 16000 },
      { level: 10, amount: 32000 },
      { level: 11, amount: 64000 },
      { level: 12, amount: 125000 },
      { level: 13, amount: 250000 },
      { level: 14, amount: 500000 },
      { level: 15, amount: 1000000 },
    ] as MoneyLadderItem[],
    currentPrizeLevel: 0, // Represents the number of correctly answered questions
    lifelineFeedback: '',
    fiftyFiftyActiveForCurrentQuestion: false, // Track if 50:50 is active for current question only
  }),
  actions: {
    startGame() {
      const questionStore = useQuestionStore()
      if (questionStore.questions.length === 0) {
        questionStore.fetchSampleQuestions()
      }
      if (questionStore.questions.length > 0) {
        this.currentQuestionIndex = 0
        this.currentQuestion = questionStore.questions[this.currentQuestionIndex]
        this.score = 0
        this.currentPrizeLevel = 0
        this.gameStatus = 'playing'
        this.selectedAnswerId = null
        this.isCorrect = null
        this.lifelines.forEach((l) => (l.available = true))
        this.fiftyFiftyActiveForCurrentQuestion = false
        this.lifelineFeedback = ''
      } else {
        console.error('No questions available to start the game.')
        this.gameStatus = 'pending'
      }
    },
    selectAnswer(answerId: string) {
      if (this.gameStatus !== 'playing' || this.selectedAnswerId !== null) return // Allow selection only once
      this.selectedAnswerId = answerId
      this.isCorrect = null // Reset correctness check until confirmed
    },
    confirmAnswer() {
      if (this.gameStatus !== 'playing' || !this.selectedAnswerId || !this.currentQuestion) return

      if (this.selectedAnswerId === this.currentQuestion.correctAnswerId) {
        this.isCorrect = true
        this.currentPrizeLevel++
        if (this.currentPrizeLevel > 0 && this.currentPrizeLevel <= this.moneyLadder.length) {
          this.score = this.moneyLadder[this.currentPrizeLevel - 1].amount
        }
      } else {
        this.isCorrect = false
        this.gameStatus = 'gameOver'
      }
    },
    nextQuestion() {
      const questionStore = useQuestionStore()
      if (
        this.currentQuestionIndex < questionStore.questions.length - 1 &&
        this.currentPrizeLevel < this.moneyLadder.length
      ) {
        this.currentQuestionIndex++
        this.currentQuestion = questionStore.questions[this.currentQuestionIndex]
        this.selectedAnswerId = null
        this.isCorrect = null
        this.lifelineFeedback = ''
        // Reset the 50:50 flag for the new question
        this.fiftyFiftyActiveForCurrentQuestion = false
        // Note: We don't reset lifelines.available here - they stay used for all subsequent questions
      } else {
        this.gameStatus = 'finished' // All questions answered or max prize reached
      }
    },
    useLifeline(lifelineId: string) {
      if (this.gameStatus !== 'playing') return
      const lifeline = this.lifelines.find((l) => l.id === lifelineId)
      if (lifeline && lifeline.available) {
        // Mark the lifeline as used - once a lifeline is used, it remains unavailable
        // for the entire game, across all subsequent questions
        lifeline.available = false

        // Use the imported i18n instance to get translations
        this.lifelineFeedback = i18n.global.t('used', [lifeline.name])

        // Specific lifeline logic (e.g., for 50-50) will be handled by components reacting to this or by more detailed state.
        if (lifelineId === '50-50' && this.currentQuestion) {
          // Set the flag to indicate 50:50 is active for this question only
          this.fiftyFiftyActiveForCurrentQuestion = true
          // The component AnswerButtons.vue will handle the visual effect of 50:50
          this.lifelineFeedback += ' ' + i18n.global.t('incorrectRemoved')
        } else if (lifelineId === 'ask-audience') {
          // Simulate audience poll - for now, just a message
          this.lifelineFeedback += ' ' + i18n.global.t('audienceThinking')
        }
      } else {
        this.lifelineFeedback = i18n.global.t('lifelineNotAvailable', [lifelineId])
      }
    },
    resetGame() {
      this.currentQuestionIndex = 0
      this.currentQuestion = null
      this.selectedAnswerId = null
      this.isCorrect = null
      this.lifelines.forEach((l) => (l.available = true))
      this.score = 0
      this.currentPrizeLevel = 0
      this.gameStatus = 'pending'
      this.fiftyFiftyActiveForCurrentQuestion = false
      this.lifelineFeedback = ''
      const questionStore = useQuestionStore()
      questionStore.fetchSampleQuestions() // Reload sample questions
    },
  },
  getters: {
    getCurrentQuestionData: (state) => state.currentQuestion,
    getCurrentScore: (state) => state.score,
    getCurrentPrizeLevelDetails: (state) => {
      if (state.currentPrizeLevel > 0 && state.currentPrizeLevel <= state.moneyLadder.length) {
        return state.moneyLadder[state.currentPrizeLevel - 1]
      }
      return null
    },
    isLifelineAvailable: (state) => (lifelineId: string) => {
      const lifeline = state.lifelines.find((l) => l.id === lifelineId)
      return lifeline ? lifeline.available : false
    },
  },
})
