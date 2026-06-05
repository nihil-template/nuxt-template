<script setup lang="ts">
defineProps<{
  hook: string;
}>();
</script>

<template>
  <div class="flex flex-col gap-3 rounded-2 bg-black-50 border border-black-200 p-5 overflow-hidden">
    <div class="flex flex-col gap-1">
      <span class="text-xs font-600 text-blue-500 uppercase tracking-wide">Session Core</span>
      <h2 class="text-lg font-700 text-black-900">오늘의 핵심</h2>
    </div>
    <p class="text-sm text-black-700 leading-relaxed whitespace-pre-wrap break-all">{{ hook }}</p>
  </div>
</template>
