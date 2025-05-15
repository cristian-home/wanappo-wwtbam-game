<template>
  <div
    class="overflow-hidden w-dvw h-dvh bg-gradient-to-br from-purple-900 via-purple-700 to-pink-700 text-gray-100 min-h-screen"
  >
    <RouterView class="w-dvw h-dvh" />
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
