<script setup lang="ts">
import '~/assets/styles/alt-body.css';
</script>

<template>
  <div data-app='nihil-app' class='flex flex-col h-full'>
    <header class="bg-white px-5 py-3 border-b border-black-200 flex flex-row items-center justify-between">
      <span class="text-lg font-700 text-black-900">header</span>
    </header>
    <main class="flex-1 overflow-auto">
      <slot />
    </main>
  </div>
</template>
