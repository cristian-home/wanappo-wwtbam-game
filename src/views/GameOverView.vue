<script setup lang="ts">
defineProps({
  score: {
    type: Number,
    required: false,
    default: 0,
  },
})
</script>

<template>
  <div>
    <h1>Game Over</h1>
    <p>Thank you for playing!</p>
    <p>Your score: {{ score }}</p>
    <button @click="restartGame">Restart Game</button>
  </div>
</template>
