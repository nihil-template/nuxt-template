<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/utils/cn';

interface Props extends /* @vue-ignore */ VariantProps<typeof cssVariants> {
  class?: string;
  custom?: {
    div?: string;
  };
}

const props = defineProps<Props>();

const cssVariants = cva(
  [
    `flex-row-1`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  },
);

const commonStore = useCommonStore();
const { exampleData } = storeToRefs(commonStore);
const { getExampleData } = commonStore;

onBeforeMount(() => {
  getExampleData();
});
</script>

<template>
  <div :class='cn(cssVariants({}), props.class)'>
    {{ exampleData }}
  </div>
</template>
