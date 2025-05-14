<template>
  <div class="text-center mb-5">
    <img src="@/assets/logo.svg" :alt="$t('gameLogoAlt')" class="max-h-24 inline-block" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GameLogo',
})
</script>
