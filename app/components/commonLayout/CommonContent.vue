<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/utils/cn';

interface Props extends /* @vue-ignore */ VariantProps<typeof cssVariants> {
  class?: string;
}

const props = defineProps<Props>();

const cssVariants = cva(
  [
    `flex-1 shrink-0 grid grid-cols-12 gap-5 h-full overflow-hidden`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  },
);
</script>

<template>
  <div :class='cn(cssVariants({}), props.class)'>
    <aside class='col-span-3 h-full overflow-y-auto bg-white'>
      aside
    </aside>
    <main class='col-span-9 h-full overflow-y-auto bg-white'>
      <slot />
    </main>
  </div>
</template>
