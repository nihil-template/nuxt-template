<script setup lang="ts">
import type { AtlasPin } from '~/data/map/pin-types'

const props = defineProps<{
  pin: AtlasPin
}>()

defineEmits<{
  close: []
}>()

const kindLabel = computed(() => {
  const labels: Record<string, string> = {
    kingdom: '왕국',
    city: '도시',
    village: '마을',
    dungeon: '던전',
    landmark: '랜드마크',
    session: '세션 기록',
    event: '사건',
  }

  return labels[props.pin.kind] ?? props.pin.kind
})
</script>

<template>
  <aside
    class="absolute right-4 top-4 z-[1000] max-h-[calc(100%-2rem)] w-[360px] overflow-y-auto rounded-2xl border border-white/10 bg-neutral-950/95 p-4 shadow-2xl backdrop-blur"
  >
    <div class="mb-3 flex items-start justify-between gap-3">
      <div>
        <p class="text-xs text-neutral-400">{{ kindLabel }}</p>
        <h2 class="text-xl font-semibold">{{ pin.name }}</h2>
      </div>

      <button
        type="button"
        class="rounded-lg px-2 py-1 text-sm text-neutral-400 hover:bg-white/10 hover:text-white"
        @click="$emit('close')"
      >
        닫기
      </button>
    </div>

    <img
      v-if="pin.imageUrl"
      :src="pin.imageUrl"
      :alt="pin.name"
      class="mb-4 h-40 w-full rounded-xl object-cover"
    >

    <p v-if="pin.summary" class="mb-4 text-sm leading-6 text-neutral-200">
      {{ pin.summary }}
    </p>

    <div v-if="pin.sessionNo" class="mb-4 rounded-xl bg-white/5 p-3 text-sm">
      <p class="text-neutral-400">세션 번호</p>
      <p>{{ pin.sessionNo }}화</p>

      <p v-if="pin.sessionDate" class="mt-2 text-neutral-400">진행일</p>
      <p v-if="pin.sessionDate">{{ pin.sessionDate }}</p>
    </div>

    <div v-if="pin.tags?.length" class="mb-4 flex flex-wrap gap-2">
      <span
        v-for="tag in pin.tags"
        :key="tag"
        class="rounded-full bg-white/10 px-2 py-1 text-xs text-neutral-200"
      >
        {{ tag }}
      </span>
    </div>

    <a
      v-if="pin.notionUrl"
      :href="pin.notionUrl"
      target="_blank"
      rel="noreferrer"
      class="block rounded-xl bg-white px-4 py-3 text-center text-sm font-medium text-neutral-950 hover:bg-neutral-200"
    >
      노션에서 열기
    </a>
  </aside>
</template>
