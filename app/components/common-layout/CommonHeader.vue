<script setup lang="ts">
import { cva } from 'class-variance-authority';
import { cn } from '~/utils/cn.ts';

const props = defineProps<{
  class?: string;
}>();

const cssVariants = cva(
  [
    '',
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
  <header
    :class="cn([
      cssVariants({}),
      props.class,
    ])"
  >
    header
  </header>
</template>

<style scoped>

</style>
