<template>
  <div 
    class="absolute inset-0 z-[1500] flex items-center justify-center bg-black/60 backdrop-blur-sm"
    @click.self="$emit('close')"
  >
    <div class="mx-4 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-neutral-900 p-6 shadow-2xl">
      <!-- Header -->
      <div class="mb-6 flex items-start justify-between">
        <div>
          <p class="text-xs text-neutral-400">
            {{ pin.kind === 'landmark' ? '랜드마크' : '세션 기록' }}
          </p>
          <h2 class="text-2xl font-semibold text-white">
            {{ isEditing ? '편집' : pin.name }}
          </h2>
        </div>
        <button
          class="rounded-lg p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white"
          @click="$emit('close')"
        >
          <Icon icon="lucide:x" class="h-5 w-5" />
        </button>
      </div>

      <!-- Edit Form -->
      <div v-if="isEditing" class="space-y-4">
        <div>
          <label class="mb-1 block text-sm text-neutral-400">이름</label>
          <input
            v-model="formData.name"
            type="text"
            class="w-full rounded-lg bg-neutral-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label class="mb-1 block text-sm text-neutral-400">설명</label>
          <textarea
            v-model="formData.description"
            rows="4"
            class="w-full rounded-lg bg-neutral-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label class="mb-1 block text-sm text-neutral-400">이미지 URL</label>
          <input
            v-model="formData.imageUrl"
            type="text"
            class="w-full rounded-lg bg-neutral-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="/images/..."
          />
        </div>

        <div>
          <label class="mb-1 block text-sm text-neutral-400">문서 링크</label>
          <input
            v-model="formData.documentUrl"
            type="text"
            class="w-full rounded-lg bg-neutral-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="https://..."
          />
        </div>

        <div>
          <label class="mb-1 block text-sm text-neutral-400">태그 (쉼표로 구분)</label>
          <input
            v-model="tagsInput"
            type="text"
            class="w-full rounded-lg bg-neutral-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="태그 1, 태그 2, 태그 3"
          />
        </div>
      </div>

      <!-- View Mode -->
      <div v-else class="space-y-4">
        <!-- Image -->
        <div v-if="pin.imageUrl" class="relative overflow-hidden rounded-xl">
          <img
            :src="pin.imageUrl"
            :alt="pin.name"
            class="h-48 w-full object-cover"
          />
        </div>

        <!-- Description -->
        <p v-if="pin.description" class="text-sm leading-relaxed text-neutral-300">
          {{ pin.description }}
        </p>

        <!-- Document Link -->
        <a
          v-if="pin.documentUrl"
          :href="pin.documentUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 rounded-xl bg-blue-600/20 px-4 py-3 text-sm text-blue-400 hover:bg-blue-600/30"
        >
          <Icon icon="lucide:file-text" class="h-4 w-4" />
          문서 보기
        </a>

        <!-- Tags -->
        <div v-if="pin.tags?.length" class="flex flex-wrap gap-2">
          <span
            v-for="tag in pin.tags"
            :key="tag"
            class="rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-300"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Coordinates -->
        <div class="rounded-xl bg-neutral-800 p-3 text-xs text-neutral-500">
          좌표: ({{ pin.x }}, {{ pin.y }})
        </div>

        <!-- Dates -->
        <div class="text-xs text-neutral-500">
          <p>생성일: {{ formatDate(pin.createdAt) }}</p>
          <p>수정일: {{ formatDate(pin.updatedAt) }}</p>
        </div>
      </div>

      <!-- Actions -->
      <div class="mt-6 flex gap-3">
        <button
          v-if="!isEditing"
          class="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          @click="$emit('edit')"
        >
          수정
        </button>
        <button
          v-if="isEditing"
          class="flex-1 rounded-lg bg-neutral-700 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-600"
          @click="$emit('close')"
        >
          취소
        </button>
        <button
          v-if="isEditing"
          class="flex-1 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          @click="handleSave"
        >
          저장
        </button>
        <button
          class="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          @click="$emit('delete', pin.id)"
        >
          삭제
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { MapPinData } from '~/types/interactive-map'

const props = defineProps<{
  pin: MapPinData
  isEditing: boolean
}>()

const emit = defineEmits<{
  close: []
  edit: []
  delete: [id: string]
  save: [pin: MapPinData]
}>()

const formData = ref({
  name: props.pin.name,
  description: props.pin.description || '',
  imageUrl: props.pin.imageUrl || '',
  documentUrl: props.pin.documentUrl || '',
  tags: props.pin.tags || [],
})

const tagsInput = computed({
  get: () => formData.value.tags.join(', '),
  set: (value) => {
    formData.value.tags = value.split(',').map(t => t.trim()).filter(Boolean)
  },
})

watch(() => props.pin, (newPin) => {
  formData.value = {
    name: newPin.name,
    description: newPin.description || '',
    imageUrl: newPin.imageUrl || '',
    documentUrl: newPin.documentUrl || '',
    tags: newPin.tags || [],
  }
}, { immediate: true })

const handleSave = () => {
  emit('save', {
    ...props.pin,
    ...formData.value,
  })
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>
