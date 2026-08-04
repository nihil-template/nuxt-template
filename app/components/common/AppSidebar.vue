<script lang="ts" setup>
import { cva } from 'class-variance-authority';
import type { NavigationItem } from '~/config/navigation.config';
import { navigationItems } from '~/config/navigation.config';
import { cn } from '~/utils/cn';

const props = defineProps<{
  class?: string;
}>();

const emit = defineEmits<{
  navigate: [item: NavigationItem];
}>();

const cssVariants = cva(
  [
    'h-full',
  ],
  {
    variants: {},
    compoundVariants: [
    ],
    defaultVariants: {},
  },
);

const onNavigate = (item: NavigationItem): void => {
  emit('navigate', item);
};
</script>

<template>
  <nav
    aria-label="주요 메뉴"
    :class="cn([
      cssVariants({}),
      props.class,
    ])"
  >
    <ElMenu>
      <ElMenuItem
        v-for="item in navigationItems"
        :key="item.to"
        :index="item.to"
      >
        <NuxtLink
          :to="item.to"
          class="flex items-center gap-2"
          @click="onNavigate(item)"
        >
          <Icon :name="item.icon" />
          <span>{{ item.label }}</span>
        </NuxtLink>
      </ElMenuItem>
    </ElMenu>
  </nav>
</template>
