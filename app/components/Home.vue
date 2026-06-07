<script setup lang="ts">
interface AppCard {
  name: string;
  description: string;
  path: string;
  icon: string;
}

const apps: AppCard[] = [
  {
    name: '세션 롤 테이블',
    description: 'TRPG 세션을 위한 랜덤 롤 테이블 도구',
    path: '/tools/session-roll-table',
    icon: 'lucide:dice-5',
  },
  {
    name: '인터렉티브 맵',
    description: '세션 지도 및 랜드마크 관리 도구',
    path: '/tools/interactive-map',
    icon: 'lucide:map',
  },
];
</script>

<template>
  <div class="p-6 max-w-6xl mx-auto">
    <h1 class="text-2xl font-bold text-black-900 mb-6">D&D 마스터 도구</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink
        v-for="app in apps"
        :key="app.path"
        :to="app.path"
        class="block p-5 border border-black-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all bg-white group"
      >
        <div class="flex items-start gap-3">
          <div class="p-2 bg-black-50 rounded-lg group-hover:bg-blue-50 transition-colors">
            <Icon :name="app.icon" class="w-6 h-6 text-black-700 group-hover:text-blue-500" />
          </div>
          <div class="flex-1">
            <h2 class="text-lg font-semibold text-black-900 group-hover:text-blue-600">
              {{ app.name }}
            </h2>
            <p class="text-sm text-black-600 mt-1">
              {{ app.description }}
            </p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
