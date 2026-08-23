<script setup lang="ts">
import {
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue';
import CommonFooter from '~/components/layout/common/CommonFooter.vue';
import { useAppStore } from '~/stores/app.store';

const appStore = useAppStore();
const isMobileViewport = ref(false);
let mobileMediaQuery: MediaQueryList | null = null;

function onSyncMobileViewport(matches: boolean) {
  isMobileViewport.value = matches;

  if (!matches) {
    appStore.onSetSidebarOpen(false);
  }
}

function onChangeMobileViewport(event: MediaQueryListEvent) {
  onSyncMobileViewport(event.matches);
}

onMounted(() => {
  mobileMediaQuery = window.matchMedia('(max-width: 767px)');
  onSyncMobileViewport(mobileMediaQuery.matches);
  mobileMediaQuery.addEventListener('change', onChangeMobileViewport);
});

onBeforeUnmount(() => {
  mobileMediaQuery?.removeEventListener('change', onChangeMobileViewport);
});
</script>

<template>
  <ElContainer class="h-dvh overflow-hidden" direction="vertical">
    <CommonHeader
      :show-sidebar-toggle="isMobileViewport"
      @open-sidebar="appStore.onSetSidebarOpen(true)"
    />
    <CommonContent @navigate="appStore.onSetSidebarOpen(false)">
      <slot />
    </CommonContent>
    <CommonFooter />
    <ElDrawer
      v-if="isMobileViewport"
      v-model="appStore.isSidebarOpen"
      body-class="p-2!"
      header-class="mb-2!"
      direction="ltr"
      size="300px"
      title="메뉴"
    >
      <CommonSidebar @navigate="appStore.onSetSidebarOpen(false)" />
    </ElDrawer>
  </ElContainer>
</template>

<style scoped>

</style>
