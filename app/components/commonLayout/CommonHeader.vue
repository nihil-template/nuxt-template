<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/utils/cn';

interface Props extends /* @vue-ignore */ VariantProps<typeof cssVariants> {
  class?: string;
}

const props = defineProps<Props>();

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
    <NuxtLink
      to='/'
      class='text-lg font-700 text-black-900 hover:text-blue-500 transition-colors'
    >
      D&D 마스터 툴
    </NuxtLink>

    <NuxtLink
      to='/'
      class='flex items-center gap-1.5 text-sm font-600 text-black-600 hover:text-blue-500 transition-colors rounded-2 px-3 py-1.5 hover:bg-black-50'
      aria-label='홈으로 이동'
    >
      <Icon name='lucide:layout-grid' class='w-4 h-4' />
      <span>앱 목록</span>
    </NuxtLink>
  </header>
</template>
