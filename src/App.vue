<template>
  <div
    id="app"
    class="w-full h-dvh bg-gradient-to-br from-purple-900 via-purple-700 to-pink-700 text-gray-100 min-h-screen flex flex-col font-sans"
  >
    <!-- <header v-if="!isGameRoute" class="leading-normal max-h-screen p-4 border-b border-gray-700">
      <GameLogo />
      <nav class="w-full text-xs text-center mt-4">
        <RouterLink
          to="/"
          class="inline-block px-4 border-l border-gray-600 text-yellow-400 hover:text-yellow-300 first:border-l-0"
          >{{ $t('home') }}</RouterLink
        >
        <RouterLink
          to="/game"
          class="inline-block px-4 border-l border-gray-600 text-yellow-400 hover:text-yellow-300"
          >{{ $t('playGame') }}</RouterLink
        >
        <RouterLink
          to="/gameover"
          class="inline-block px-4 border-l border-gray-600 text-yellow-400 hover:text-yellow-300"
          >{{ $t('gameOverTest') }}</RouterLink
        >
      </nav>
    </header> -->
    <RouterView class="flex-grow flex flex-col" />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useEventBus } from '@vueuse/core'
import { onBeforeUnmount } from 'vue'
import { useSound } from '@vueuse/sound'
import bgMusic from './assets/sounds/background.mp3'

const bus = useEventBus<string>('sounds')

const bgAudio = useSound(bgMusic, {
  autoplay: false,
  loop: true,
})

function listener(event: string) {
  console.log(`sounds: ${event}`)

  if (event === 'playBackground') {
    if (!bgAudio.isPlaying.value) {
      bgAudio.play()
    }
  } else if (event === 'stopGameOver') {
    // bgAudio.stop()
  } else if (event === 'stopGamePlay') {
    // bgAudio.stop()
  }
}

const unsubscribe = bus.on(listener)

onBeforeUnmount(() => {
  unsubscribe()
})
</script>
