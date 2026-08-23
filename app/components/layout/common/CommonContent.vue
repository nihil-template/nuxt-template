<script lang="ts" setup>
import { cva } from 'class-variance-authority';
import { cn } from '~/utils/cn.ts';

const props = defineProps<{
  class?: string;
  sidebar?: boolean;
}>();

const cssVariants = cva(
  [
    'flex-1 flex flex-row gap-1 overflow-y-auto',
  ],
  {
    variants: {},
    compoundVariants: [
    ],
    defaultVariants: {},
  },
);
</script>

<template>
  <div
    :class="cn([
      cssVariants({}),
      props.class,
    ])"
  >
    <aside v-if="props.sidebar" class="fixed">aside</aside>
    <main class="">
      <slot />
    </main>
  </div>
</template>

<style scoped>

</style>
