<template>
  <div class="p-2.5 border border-gray-700 rounded-md bg-black bg-opacity-10 flex flex-col gap-4">
    <h3 class="text-center text-lg font-semibold">{{ $t('moneyLadder') }}</h3>
    <ul class="list-none overflow-y-auto">
      <li
        v-for="item in moneyLadder"
        :key="item.level"
        class="py-1.5 text-center font-bold"
        :class="{
          'bg-yellow-400 text-black': item.level === currentGameLevel,
          'text-green-500 line-through':
            item.level < currentGameLevel && item.level !== currentGameLevel,
          'text-gray-300': item.level > currentGameLevel,
        }"
      >
        {{ item.amount.toLocaleString() }} {{ $t('points') }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore, type MoneyLadderItem } from '../stores/GameStore'

const gameStore = useGameStore()
const moneyLadder = computed(() => gameStore.moneyLadder as MoneyLadderItem[])
const currentGameLevel = computed(() => gameStore.currentPrizeLevel + 1) // +1 because prizeLevel is 0-indexed for correctly answered
</script>
