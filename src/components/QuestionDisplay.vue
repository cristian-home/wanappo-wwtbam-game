<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '../stores/GameStore'

const gameStore = useGameStore()
const currentQuestion = computed(() => gameStore.getCurrentQuestionData)
</script>

<template>
  <div
    class="display-question p-5 px-12 md:px-16 mb-5 bg-black bg-opacity-50 text-white rounded-lg text-center text-2xl min-h-[100px] flex items-center justify-center"
  >
    <p v-if="currentQuestion">{{ currentQuestion.text }}</p>
    <p v-else>{{ $t('loadingQuestion') }}</p>
  </div>
</template>

<style lang="css" scoped>
.display-question {
  filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.6));
  position: relative;
  color: #fff;
  font-weight: 500;
  text-decoration: none;
  text-align: center;
  clip-path: polygon(5% 0, 95% 0, 100% 50%, 95% 100%, 5% 100%, 0 50%);
  background-color: #161213;
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
</style>
