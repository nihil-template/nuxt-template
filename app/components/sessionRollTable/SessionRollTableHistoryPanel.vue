<script setup lang="ts">
import type { RollResult } from '~/types/session-roll-table.types';

defineProps<{
  history: RollResult[];
}>();
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-col gap-1">
      <span class="text-xs font-600 text-blue-500 uppercase tracking-wide">Recent Rolls</span>
      <h2 class="text-lg font-700 text-black-900">최근 결과</h2>
    </div>

    <ol v-if="history.length > 0" class="flex flex-col gap-2">
      <li
        v-for="(item, idx) in history"
        :key="idx"
        class="flex items-start gap-3 rounded-2 bg-black-50 border border-black-200 p-4 overflow-hidden"
      >
        <span class="text-xs font-700 text-blue-500 mt-0.5 shrink-0">#{{ idx + 1 }}</span>
        <div class="flex flex-col gap-1 min-w-0">
          <p class="text-sm font-600 text-black-900 break-words">
            [{{ item.quest.roll }}/{{ item.theme.roll }}/{{ item.terrain.roll }}]
            {{ item.quest.title }} · {{ item.theme.title }} · {{ item.terrain.title }}
          </p>
          <p class="text-xs text-black-500 break-words">{{ item.hook }}</p>
        </div>
      </li>
    </ol>

    <p v-else class="text-sm text-black-500">아직 굴림 기록이 없습니다.</p>
  </div>
</template>
