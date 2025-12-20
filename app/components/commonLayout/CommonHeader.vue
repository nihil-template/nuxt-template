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
    ``,
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
    icon: '',
  },
]);
</script>

<template>
  <header :class='cn(cssVariants({}), props.class)'>
    <NuxtLink to='/'>
      <img src='~/assets/images/nihil-logo.png' alt='logo' class='size-5'>
      <span>NIHILncunia</span>
    </NuxtLink>

    <nav>
      <ul>
        <li v-for='menu in menuItems' :key='menu.link'>
          <NuxtLink :to='menu.link'>
            <Icon v-if='menu.icon' :icon='menu.icon' />
            <span>{{ menu.label }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
