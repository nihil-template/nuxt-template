<script setup lang="ts">
import { QueryClient, VUE_QUERY_CLIENT } from '@tanstack/vue-query';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { onUnmounted, provide } from 'vue';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 15,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

provide(VUE_QUERY_CLIENT, queryClient);

if (import.meta.client) {
  queryClient.mount();
  onUnmounted(() => queryClient.unmount());
}
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ClientOnly>
    <VueQueryDevtools />
  </ClientOnly>
</template>
