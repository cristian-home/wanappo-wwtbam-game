import { defineStore } from 'pinia'

export const useTimerStore = defineStore('timer', {
  state: () => ({
    timeLeft: 120, // Default time per question
    isRunning: false,
    intervalId: null as null | number,
  }),
  actions: {
    startTimer(duration: number = 120) {
      this.timeLeft = duration
      this.isRunning = true
      if (this.intervalId) {
        clearInterval(this.intervalId as number)
      }
      this.intervalId = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--
        } else {
          this.stopTimer()
          // GameStore should react to timeLeft === 0 if game is running
        }
      }, 1000)
    },
    stopTimer() {
      this.isRunning = false
      if (this.intervalId) {
        clearInterval(this.intervalId as number)
        this.intervalId = null
      }
    },
    resetTimer(duration: number = 120) {
      this.stopTimer()
      this.timeLeft = duration
    },
  },
})
