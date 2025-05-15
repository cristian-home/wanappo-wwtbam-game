<script setup lang="ts">
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import GameLogo from '../components/GameLogo.vue'
import SolarPlayBoldDuotone from '~icons/solar/play-bold-duotone'
import { ref } from 'vue'
import { useMotion } from '@vueuse/motion'
import { motions } from '@/motions'
import { deepMerge } from '@/utils/objects'

const router = useRouter()

const logo = ref<HTMLElement>()
const button = ref<HTMLElement>()

const { leave: leaveLogo } = useMotion(
  logo,
  deepMerge(motions.zoomIn, { leave: { transition: { delay: 500 } } }),
)

const { leave: leaveButton } = useMotion(
  button,
  deepMerge(motions.zoomIn, { enter: { transition: { delay: 500 } } }),
)

onBeforeRouteLeave((to, from, next) => {
  Promise.all([
    new Promise((resolve) => leaveLogo(() => resolve(true))),
    new Promise((resolve) => leaveButton(() => resolve(true))),
  ]).then(() => {
    next()
  })
})

const playNewGame = () => {
  router.push({ name: 'gameplay' })
}
</script>

<template>
  <main class="w-full flex-grow flex flex-col items-center justify-center">
    <GameLogo class="w-80 h-80" ref="logo" />
    <button
      class="cursor-pointer flex gap-4 p-4 bg-black border-2 border-gray-900 text-white font-bold text-lg rounded-lg shadow-md hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 items-center justify-center"
      ref="button"
      @click="playNewGame"
    >
      <SolarPlayBoldDuotone />
      <span>{{ $t('playGame') }}</span>
    </button>
  </main>
</template>
