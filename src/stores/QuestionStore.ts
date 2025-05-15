import { defineStore } from 'pinia'
import questionsData from '@/data/questions.json'

export interface QuestionOption {
  id: string
  text: string
}

export interface Question {
  id: number
  text: string
  options: QuestionOption[]
  correctAnswerId: string
  difficulty: number
}

export const useQuestionStore = defineStore('question', {
  state: () => ({
    questions: [] as Question[],
  }),
  actions: {
    loadQuestions(newQuestions: Question[]) {
      this.questions = newQuestions
    },
    fetchSampleQuestions() {
      this.questions = questionsData as Question[]
    },
  },
  getters: {
    getQuestionById: (state) => (id: number) => {
      return state.questions.find((q) => q.id === id)
    },
  },
})
