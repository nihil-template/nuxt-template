<script setup lang="ts">
import type { Quest, Theme, Terrain, RollResult } from '~/types/session-roll-table.types';

definePageMeta({
  layout: 'default-layout',
});

useSetMeta({
  title: '세션 롤 테이블',
  url: '/tools/session-roll-table',
});

const { data: response } = useGet<{
  quests: Quest[];
  themes: Theme[];
  terrains: Terrain[];
}>({
  url: '/session-roll-table',
  key: ['session-roll-table'],
  enabled: true,
});

const angraEnabled = ref(false);
const currentResult = ref<RollResult | null>(null);
const history = ref<RollResult[]>([]);

const questPool = computed(() => {
  const quests = response.value?.data?.quests ?? [];
  if (angraEnabled.value) return quests;
  return quests.filter((q: Quest) => !ANGRA_QUEST_ROLLS.has(q.roll));
});

const themePool = computed(() => response.value?.data?.themes ?? []);
const terrainPool = computed(() => response.value?.data?.terrains ?? []);

const ANGRA_QUEST_ROLLS = new Set([32, 33, 34, 35, 36, 37, 38, 39]);

function pick<T>(pool: T[]): T {
  return pool[Math.floor(Math.random() * pool.length)];
}

function buildHook(quest: Quest, theme: Theme, terrain: Terrain): string {
  const monsterList = theme.monsters.join(' · ');
  return `[${quest.roll}, ${theme.roll}, ${terrain.roll}] ${quest.title} + ${theme.title} @ ${terrain.title}: ${quest.text} 전장은 ${terrain.text} 조우 테마는 ${theme.text} 몬스터 예시: ${monsterList}.`;
}

function onRoll() {
  if (questPool.value.length === 0 || themePool.value.length === 0 || terrainPool.value.length === 0) return;

  const quest = pick(questPool.value);
  const theme = pick(themePool.value);
  const terrain = pick(terrainPool.value);
  const hook = buildHook(quest, theme, terrain);

  const result: RollResult = { quest, theme, terrain, hook };
  currentResult.value = result;
  history.value.unshift(result);
  if (history.value.length > 6) history.value = history.value.slice(0, 6);
}

async function onCopy() {
  if (!currentResult.value) return;
  try {
    await navigator.clipboard.writeText(currentResult.value.hook);
    alert('복사 완료');
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = currentResult.value.hook;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('복사 완료');
  }
}
</script>

<template>
  <div class="flex flex-col gap-6 p-6 max-w-5xl mx-auto">
    <div class="flex flex-col gap-2">
      <p class="text-sm font-600 text-blue-500">Origin Roll Table</p>
      <h1 class="text-h3 font-700 text-black-900">룩스테라 세션 핵심 결정기</h1>
      <p class="text-md text-black-500">
        의뢰 유형, 테마, 지형을 한 번에 굴려 오늘 세션의 중심 사건을 정합니다.
      </p>
    </div>

    <SessionRollTableControlPanel
      v-model:angra="angraEnabled"
      :can-roll="questPool.length > 0 && themePool.length > 0 && terrainPool.length > 0"
      :can-copy="!!currentResult?.value"
      @roll="onRoll"
      @copy="onCopy"
    />

    <SessionRollTableResultGrid
      v-if="currentResult"
      :result="currentResult"
    />

    <SessionRollTableSessionCore
      v-if="currentResult"
      :hook="currentResult.hook"
    />

    <SessionRollTableHistoryPanel
      :history="history"
    />
  </div>
</template>
