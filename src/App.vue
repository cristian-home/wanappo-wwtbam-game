<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="Vue logo" src="@/assets/logo.svg" width="125" height="125" />

    <div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink :to="{ name: 'gameplay' }">GamePlay</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
