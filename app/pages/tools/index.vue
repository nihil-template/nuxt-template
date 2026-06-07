<script setup lang="ts">
definePageMeta({
  layout: 'common',
});

useSetMeta({
  title: '도구 목록',
  url: '/tools',
});

// /tools/ 경로로 접근시 세션 롤 테이블로 리다이렉트
navigateTo('/tools/session-roll-table', { replace: true });
</script>

<template>
  <div class="p-6">
    <p>세션 롤 테이블로 이동합니다...</p>
  </div>
</template>
