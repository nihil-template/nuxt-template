<script setup lang="ts">
definePageMeta({
  layout: 'default-layout',
})

useSetMeta({
  title: '룩스테라 월드 아틀라스',
  url: '/tools/map',
})
</script>

<template>
  <div class="h-[calc(100dvh-140px)] w-full">
    <AtlasMap />
  </div>
</template>
