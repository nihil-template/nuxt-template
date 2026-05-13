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
    `bg-white px-5 py-3 border-b border-black-200 flex flex-row items-center justify-between`,
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
      <div>
        <span class='block text-md font-900 leading-none text-black-950'>
          Character Prompt Agent
        </span>
        <span class='mt-1 block text-xs text-black-500'>
          TRPG portrait prompt workspace
        </span>
      </div>
    </NuxtLink>

    <nav class='p-2'>
      <ul class='flex flex-row items-center'>
        <li v-for='menu in menuItems' :key='menu.link'>
          <NuxtLink :to='menu.link' class='flex flex-row items-center gap-1 rounded-full px-3 py-2 text-sm text-black-700 hover:bg-black-100'>
            <Icon v-if='menu.icon' :icon='menu.icon' />
            <span>{{ menu.label }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
