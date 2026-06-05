<script setup lang="ts">
import type { RollResult } from '~/types/session-roll-table.types';

defineProps<{
  result: RollResult;
}>();

const cards = [
  { label: '의뢰 유형', key: 'quest' as const },
  { label: '조우 테마', key: 'theme' as const },
  { label: '지형', key: 'terrain' as const },
];
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <article
      v-for="card in cards"
      :key="card.key"
      class="flex flex-col gap-3 rounded-2 bg-black-50 border border-black-200 p-5 overflow-hidden"
    >
      <div class="flex items-center justify-between">
        <span class="text-xs font-600 text-black-500 uppercase tracking-wide">{{ card.label }}</span>
        <span class="text-sm font-700 text-blue-500">#{{ result[card.key].roll }}</span>
      </div>

      <h2 class="text-lg font-700 text-black-900 break-words">{{ result[card.key].title }}</h2>
      <p class="text-sm text-black-600 leading-relaxed break-words">{{ result[card.key].text }}</p>

      <div
        v-if="card.key === 'theme' && result.theme.monsters.length > 0"
        class="mt-1"
      >
        <p class="text-xs text-black-500 break-words">
          <span class="font-600">몬스터 예시:</span>
          {{ result.theme.monsters.join(' · ') }}
        </p>
      </div>
    </article>
  </div>
</template>
