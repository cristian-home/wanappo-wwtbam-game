<template>
  <div
    v-if="showUpdateNotification"
    class="fixed bottom-4 right-4 bg-black bg-opacity-80 border-2 border-yellow-500 text-white p-4 rounded-lg shadow-lg z-50 flex flex-col items-center"
  >
    <div class="text-lg font-bold mb-2">{{ $t('newVersionAvailable') }}</div>
    <div class="text-sm mb-3">{{ $t('updateNotificationText') }}</div>
    <div class="flex gap-4">
      <button
        @click="refreshApp"
        class="cursor-pointer px-4 py-2 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
      >
        {{ $t('updateNow') }}
      </button>
      <button
        @click="closeNotification"
        class="cursor-pointer px-4 py-2 bg-gray-700 text-white font-bold rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        {{ $t('later') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'

// Control notification visibility
const showUpdateNotification = ref(false)

// Register SW with periodic check for updates
const { needRefresh, updateServiceWorker } = useRegisterSW({
  onRegistered(r) {
    // Check for updates every hour when the app is open
    if (r) {
      setInterval(
        () => {
          r.update()
        },
        60 * 60 * 1000,
      )
    }
  },
  onNeedRefresh() {
    showUpdateNotification.value = true
  },
})

const refreshApp = async () => {
  showUpdateNotification.value = false
  await updateServiceWorker()
  // Force reload the page
  window.location.reload()
}

const closeNotification = () => {
  showUpdateNotification.value = false
}

onMounted(() => {
  // Show notification if an update is already available
  if (needRefresh.value) {
    showUpdateNotification.value = true
  }
})
</script>
