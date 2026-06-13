<script setup lang="ts">
import '~/assets/styles/alt-body.css';
</script>

<template>
  <div data-app='nihil-app' class='flex flex-col h-full'>
    <CommonHeader />
    <main class="flex-1 overflow-auto">
      <slot />
    </main>
  </div>
</template>
