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

const userStore = useUserStore();
const { userInfoList } = storeToRefs(userStore);
const { getUserList } = userStore;

onBeforeMount(() => {
  getUserList(
    (res) => {
      console.log(res);
    },
    (res) => {
      console.log(res);
    },
  );
});
</script>

<template>
  <div :class='cn(cssVariants({}), props.class)'>
    {{ userInfoList }}
  </div>
</template>
