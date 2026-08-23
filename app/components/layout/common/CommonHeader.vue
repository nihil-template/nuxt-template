<script lang="ts" setup>
import { cva } from 'class-variance-authority';
import { cn } from '~/utils/cn.ts';

const props = defineProps<{
  class?: string;
}>();

const cssVariants = cva(
  [
    'bg-stone-800 text-white p-2 flex flex-row items-center justify-between',
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
    <h1>
      <UiImage
        :src="siteConfig.images.logo.dark"
        :alt="siteConfig.images.logo.alt"
        height="30"
      />
      <span class="sr-only">{{ siteConfig.images.logo.alt }}</span>
    </h1>
  </header>
</template>

<style scoped>

</style>
