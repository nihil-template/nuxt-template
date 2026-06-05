<script setup lang="ts">
const angra = defineModel<boolean>('angra', { default: false });

defineProps<{
  canRoll: boolean;
  canCopy: boolean;
}>();

const emit = defineEmits<{
  roll: [];
  copy: [];
}>();
</script>

<template>
  <div class="flex flex-wrap items-center gap-4 rounded-2 bg-black-50 border border-black-200 p-4">
    <label class="flex items-center gap-3 cursor-pointer select-none">
      <input
        v-model="angra"
        type="checkbox"
        class="w-5 h-5 accent-blue-500 cursor-pointer"
      />
      <div class="flex flex-col">
        <span class="text-sm font-600 text-black-900">앙그라 안개 미션 포함</span>
        <span class="text-xs text-black-500">32~39번 의뢰 유형을 후보에 넣습니다.</span>
      </div>
    </label>

    <div class="flex items-center gap-3 ml-auto">
      <button
        type="button"
        :disabled="!canRoll"
        class="px-5 py-2.5 rounded-2 bg-blue-500 text-white text-sm font-600 hover:bg-blue-600 disabled:bg-black-300 disabled:cursor-not-allowed transition-colors"
        @click="emit('roll')"
      >
        세션 핵심 결정
      </button>
      <button
        type="button"
        :disabled="!canCopy"
        class="px-5 py-2.5 rounded-2 bg-black-200 text-black-900 text-sm font-600 hover:bg-black-300 disabled:bg-black-100 disabled:text-black-400 disabled:cursor-not-allowed transition-colors"
        @click="emit('copy')"
      >
        결과 복사
      </button>
    </div>
  </div>
</template>
