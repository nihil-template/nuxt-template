<script setup lang="ts">

import CommonFooter from '~/components/layout/common/CommonFooter.vue';
</script>

<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <CommonHeader />
    <CommonContent sidebar>
      <slot />
    </CommonContent>
    <CommonFooter />
  </div>
</template>

<style scoped>

</style>
