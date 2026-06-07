<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps<{
  name: string;
  class?: string;
}>();
</script>

<template>
  <Icon :icon="name" :class="class" />
</template>
