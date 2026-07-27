<script setup lang="ts">
import { cva } from 'class-variance-authority';
import { cn } from '~/utils/cn.ts';

const props = defineProps<{
  class?: string;
  hasSidebar?: boolean;
}>();

const cssVariants = cva(
  [
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
    v-if="hasSidebar" :class="cn([
      cssVariants({}),
      props.class,
    ])">
    <aside>aside</aside>
    <main
      :class="cn([
        cssVariants({}),
        props.class,
      ])">
      <slot />
    </main>
  </div>

  <main v-else>
    <slot />
  </main>
</template>

<style scoped>

</style>
