<script setup lang="ts">
// No need to import useI18n since we're using the global $t function
</script>

<template>
  <main>
    <h1>{{ $t('welcomeToYourApp') }}</h1>
    <h3>
      {{ $t('projectCreatedWith', ['Vite', 'Vue 3']) }}
    </h3>
  </main>
</template>
