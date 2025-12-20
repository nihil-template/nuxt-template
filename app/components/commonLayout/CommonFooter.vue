<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { cva, type VariantProps } from 'class-variance-authority';
import { DateTime } from 'luxon';

import { appConfig } from '~/config/app.config';
import { cn } from '~/utils/cn';

interface Props extends /* @vue-ignore */ VariantProps<typeof cssVariants> {
  class?: string;
}

const props = defineProps<Props>();

const cssVariants = cva(
  [
    `bg-white border-t border-black-300 p-2`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  },
);

const year = computed(() => {
  const nowYear = DateTime.now().year;
  const startYear = 2025;
  return nowYear > startYear ? `${startYear} - ${nowYear}` : startYear.toString();
});
</script>

<template>
  <footer :class='cn(cssVariants({}), props.class)'>
    <small class='flex flex-row items-center gap-1 justify-center'>
      <Icon icon='mdi:copyright' class='size-4' />
      <span class='-mt-[2px]'>
        {{ year }}. {{ appConfig.author.name }} All rights reserved.
      </span>
    </small>
  </footer>
</template>
