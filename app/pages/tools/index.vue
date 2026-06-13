<script setup lang="ts">
definePageMeta({
  layout: 'common',
});

useSetMeta({
  title: '도구 목록',
  url: '/tools',
});

interface Tool {
  name: string;
  description: string;
  path: string;
  icon: string;
}

const tools: Tool[] = [
  {
    name: '세션 롤 테이블',
    description: '공고를 무작위로 생성하여 세션 아이디어를 얻으세요. 모험가, 의뢰, 테마, 지형을 자동으로 조합합니다.',
    path: '/tools/session-roll-table',
    icon: '🎲',
  },
  {
    name: '몬스터 롤 테이블',
    description: '몬스터 관찰 데이터를 생성하여 도감 기록을 만드세요. 18 단계의 계층형 롤 테이블로 상세한 생태 정보를 기록합니다.',
    path: '/tools/monster-roll-table',
    icon: '📖',
  },
];
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold text-black-900 mb-2">도구 목록</h1>
    <p class="text-sm text-black-500 mb-6">자유 탐사 연맹에서 제공하는 도구들입니다</p>
    
    <div class="grid gap-4">
      <NuxtLink
        v-for="tool in tools"
        :key="tool.path"
        :to="tool.path"
        class="p-6 bg-white border border-black-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all group"
      >
        <div class="flex items-start gap-4">
          <div class="text-4xl">{{ tool.icon }}</div>
          <div class="flex-1">
            <h2 class="text-lg font-semibold text-black-900 group-hover:text-blue-600 transition-colors">
              {{ tool.name }}
            </h2>
            <p class="text-sm text-black-600 mt-1">
              {{ tool.description }}
            </p>
            <div class="flex items-center gap-2 mt-3 text-sm text-blue-600">
              <span>사용하기</span>
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
