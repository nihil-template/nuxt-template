<script setup lang="ts">
definePageMeta({
  layout: 'default-layout',
});

useSetMeta({
  title: '홈',
  url: '/',
});

interface ToolCard {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: string;
}

const tools: ToolCard[] = [
  {
    id: 'session-roll-table',
    title: '세션 롤 테이블',
    description: '의뢰 유형, 조우 테마, 지형을 한 번에 굴려 오늘 세션의 중심 사건을 결정합니다.',
    path: '/tools/session-roll-table',
    icon: 'game-icons:rolling-dice-cup',
  },
  {
    id: 'map',
    title: '룩스테라 월드 아틀라스',
    description: '월드맵을 탐색하고 랜드마크와 세션 기록을 확인할 수 있는 인터렉티브 맵입니다.',
    path: '/tools/map',
    icon: 'mdi:map',
  },
];
</script>

<template>
  <div class="flex flex-col gap-6 p-6">
    <div class="flex flex-col gap-2">
      <h1 class="text-h3 font-700 text-black-900">
        D&D Master Tools
      </h1>
      <p class="text-md text-black-500">
        던전 앤 드래곤 마스터를 위한 도구 모음
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink
        v-for="tool in tools"
        :key="tool.id"
        :to="tool.path"
        class="group flex flex-col gap-4 rounded-2 bg-black-100 border border-black-200 p-5 transition-all hover:border-blue-500 hover:shadow-md">
        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center w-10 h-10 rounded-2 bg-blue-500 text-white">
            <Icon :name="tool.icon" class="w-5 h-5" />
          </div>
          <h2 class="text-lg font-600 text-black-900 group-hover:text-blue-500 transition-colors">
            {{ tool.title }}
          </h2>
        </div>
        <p class="text-sm text-black-600 leading-relaxed">
          {{ tool.description }}
        </p>
      </NuxtLink>
    </div>
  </div>
</template>
