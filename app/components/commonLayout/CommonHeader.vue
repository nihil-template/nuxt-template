<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/utils/cn';

interface Props extends /* @vue-ignore */ VariantProps<typeof cssVariants> {
  class?: string;
}

const props = defineProps<Props>();

const cssVariants = cva(
  [
    `bg-white p-2 border-b border-black-300 flex flex-row items-center justify-between`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  },
);

type MenuItem = {
  label: string;
  link: string;
  icon?: string;
};

const menuItems = ref<MenuItem[]>([
  {
    label: '홈',
    link: '/',
    icon: 'mdi:home',
  },
]);
</script>

<template>
  <header :class='cn(cssVariants({}), props.class)'>
    <NuxtLink to='/' class='flex-row-1 items-center'>
      <img src='~/assets/images/nihil-logo.png' alt='logo' class='size-8'>
      <span class='font-900 text-md'>
        NIHILncunia
      </span>
    </NuxtLink>

    <nav class='p-2'>
      <ul class='flex flex-row items-center'>
        <li v-for='menu in menuItems' :key='menu.link'>
          <NuxtLink :to='menu.link' class='flex flex-row gap-1 items-center'>
            <Icon v-if='menu.icon' :icon='menu.icon' />
            <span>{{ menu.label }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
