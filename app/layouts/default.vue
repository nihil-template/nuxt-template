<script setup lang="ts">

import CommonHeader from '~/components/common-layout/CommonHeader.vue';
import CommonContent from '~/components/common-layout/CommonContent.vue';
import CommonFooter from '~/components/common-layout/CommonFooter.vue';
</script>

<template>
  <div>
    <CommonHeader />
    <CommonContent>
      <slot />
    </CommonContent>
    <CommonFooter />
  </div>
</template>

<style scoped>

</style>
