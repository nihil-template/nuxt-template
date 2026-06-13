<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { cn } from '~/utils/cn';

interface Props extends /* @vue-ignore */ VariantProps<typeof cssVariants> {
  class?: string;
}

const props = defineProps<Props>();
const route = useRoute();

// 현재 페이지 제목을 메타정보에서 가져옴
const pageTitle = computed(() => {
  return route.meta.title as string || 'D&D 마스터 툴';
});

const cssVariants = cva(
  [
    `bg-white px-5 py-3 border-b border-black-200 flex flex-row items-center justify-between`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  },
);
</script>

<template>
  <header :class='cn(cssVariants({}), props.class)'>
    <!-- 앱 목록으로 돌아가는 버튼 -->
    <NuxtLink
      to='/'
      class='flex items-center gap-1.5 text-sm font-600 text-black-600 hover:text-blue-500 transition-colors rounded-2 px-3 py-1.5 hover:bg-black-50'
      aria-label='앱 목록으로 이동'
    >
      <Icon name='lucide:arrow-left' class='w-4 h-4' />
      <span>앱 목록</span>
    </NuxtLink>

    <!-- 현재 앱 이름 표시 -->
    <h1 class='text-lg font-700 text-black-900'>
      {{ pageTitle }}
    </h1>

    <!-- 오른쪽 여백 (중앙 정렬을 위한 spacer) -->
    <div class='w-20'></div>
  </header>
</template>
