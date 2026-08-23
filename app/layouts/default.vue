<script setup lang="ts">
import CommonFooter from '~/components/layout/common/CommonFooter.vue';
import { useAppStore } from '~/stores/app.store';

const appStore = useAppStore();
const { isSidebarOpen, } = storeToRefs(appStore);
const { onSetSidebarOpen, } = appStore;
</script>

<template>
  <ElContainer
    class="h-dvh overflow-hidden"
    direction="vertical"
  >
    <CommonHeader
      @open-sidebar="onSetSidebarOpen(true)"
    />

    <CommonContent @navigate="onSetSidebarOpen(false)">
      <slot />
    </CommonContent>

    <CommonFooter />

    <ElDrawer
      v-model="isSidebarOpen"
      class="md:hidden"
      body-class="p-2!"
      header-class="mb-2!"
      direction="ltr"
      size="300px"
      title="메뉴"
    >
      <CommonSidebar @navigate="onSetSidebarOpen(false)" />
    </ElDrawer>
  </ElContainer>
</template>

<style scoped>

</style>
