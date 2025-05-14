import { defineStore } from 'pinia'

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
    // Example questions - in a real app, these would come from an API or a larger local file
    sampleQuestions: [
      {
        id: 1,
        text: 'What is the capital of France?',
        options: [
          { id: 'a', text: 'Berlin' },
          { id: 'b', text: 'Madrid' },
          { id: 'c', text: 'Paris' },
          { id: 'd', text: 'Rome' },
        ],
        correctAnswerId: 'c',
        difficulty: 1,
      },
      {
        id: 2,
        text: 'Which planet is known as the Red Planet?',
        options: [
          { id: 'a', text: 'Earth' },
          { id: 'b', text: 'Mars' },
          { id: 'c', text: 'Jupiter' },
          { id: 'd', text: 'Venus' },
        ],
        correctAnswerId: 'b',
        difficulty: 1,
      },
      {
        id: 3,
        text: 'What is the largest ocean on Earth?',
        options: [
          { id: 'a', text: 'Atlantic Ocean' },
          { id: 'b', text: 'Indian Ocean' },
          { id: 'c', text: 'Arctic Ocean' },
          { id: 'd', text: 'Pacific Ocean' },
        ],
        correctAnswerId: 'd',
        difficulty: 2,
      },
    ] as Question[],
  }),
  actions: {
    loadQuestions(newQuestions: Question[]) {
      this.questions = newQuestions
    },
    fetchSampleQuestions() {
      this.questions = this.sampleQuestions
    },
  },
  getters: {
    getQuestionById: (state) => (id: number) => {
      return state.questions.find((q) => q.id === id)
    },
  },
})
