<template>
  <div class="relative h-full w-full">
    <!-- Map Container -->
    <div ref="mapContainer" class="h-full w-full" />

    <!-- Toolbar - Left Center -->
    <div class="absolute left-4 top-1/2 z-[1000] -translate-y-1/2 space-y-3">
      <!-- Filter Buttons -->
      <div class="flex flex-col gap-1 rounded-lg bg-neutral-900/90 p-1.5 shadow-lg backdrop-blur">
        <button
          v-for="filter in filters"
          :key="filter.kind"
          :class="[
            'flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs transition-colors',
            filter.enabled 
              ? 'bg-blue-600 text-white' 
              : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700',
          ]"
          @click="toggleFilter(filter.kind)"
        >
          <span :class="['h-1.5 w-1.5 rounded-full', filter.color]" />
          {{ filter.label }}
        </button>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col gap-1 rounded-lg bg-neutral-900/90 p-1.5 shadow-lg backdrop-blur">
        <button
          :class="[
            'rounded px-2.5 py-1.5 text-xs transition-colors',
            isDraggingMode 
              ? 'bg-orange-600 text-white' 
              : 'bg-green-600 text-white hover:bg-green-700',
          ]"
          @click="toggleDragMode"
        >
          {{ isDraggingMode ? '이동 모드 ON' : '마커 생성' }}
        </button>
        <button
          class="rounded bg-neutral-700 px-2.5 py-1.5 text-xs text-white hover:bg-neutral-600"
          @click="exportData"
        >
          내보내기
        </button>
        <button
          class="rounded bg-neutral-700 px-2.5 py-1.5 text-xs text-white hover:bg-neutral-600"
          @click="importData"
        >
          가져오기
        </button>
      </div>
    </div>

    <!-- Search - Top Right -->
    <div class="absolute right-4 top-4 z-[1000]">
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="마커 검색..."
          class="w-56 rounded-lg bg-neutral-900/90 px-3.5 py-1.5 text-xs text-white placeholder-neutral-500 shadow-lg backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <Icon 
          v-if="searchQuery"
          icon="lucide:x" 
          class="absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 cursor-pointer text-neutral-500"
          @click="searchQuery = ''"
        />
      </div>
    </div>

    <!-- Hint - Bottom Left -->
    <div class="absolute bottom-4 left-4 z-[1000] rounded-lg bg-neutral-900/90 px-3 py-2 text-[10px] text-neutral-400 shadow-lg backdrop-blur">
      <p v-if="isDraggingMode">🖱️ 드래그: 마커 이동</p>
      <p v-else>🖱️ 더블클릭: 마커 생성</p>
      <p>🖱️ 클릭: 마커 선택</p>
      <p>🖱️ 휠: 확대/축소</p>
    </div>

    <!-- Pin Detail Modal -->
    <InteractiveMapPinModal
      v-if="selectedPin"
      :pin="selectedPin"
      :is-editing="isEditing"
      @close="closeModal"
      @edit="startEditing"
      @delete="deletePin"
      @save="savePin"
    />

    <!-- Create Modal -->
    <InteractiveMapCreateModal
      v-if="isCreating"
      :position="createPosition"
      @close="cancelCreate"
      @save="createPin"
    />

    <!-- Loading -->
    <div v-if="isLoading" class="absolute inset-0 z-[2000] flex items-center justify-center bg-neutral-950/80">
      <div class="text-white">로딩 중...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { v4 as uuidv4 } from 'uuid'
import { Icon } from '@iconify/vue'
import type { MapPinData, MapPinKind } from '~/types/interactive-map'
import { interactiveMapConfig } from '~/data/interactive-map/map-config'
import { initialPins } from '~/data/interactive-map/pins'

// State
const mapContainer = ref<HTMLDivElement | null>(null)
const isLoading = ref(true)
const pins = ref<MapPinData[]>([])
const selectedPin = ref<MapPinData | null>(null)
const isEditing = ref(false)
const isCreating = ref(false)
const createPosition = ref<{ x: number; y: number } | null>(null)
const searchQuery = ref('')
const createModeEnabled = ref(false)
const isDraggingMode = ref(false)

// Filters
const filters = ref([
  { kind: 'landmark' as MapPinKind, label: '랜드마크', color: 'bg-blue-500', enabled: true },
  { kind: 'session' as MapPinKind, label: '세션', color: 'bg-green-500', enabled: true },
])

// Markers storage
const markers = new Map<string, L.Marker>()
let map: L.Map | null = null

// Icon configuration
const iconConfig = {
  landmark: {
    icon: 'lucide:castle',
    color: '#3b82f6',
    bgColor: '#1e40af',
  },
  session: {
    icon: 'lucide:flag',
    color: '#22c55e',
    bgColor: '#166534',
  },
}

// Computed
const filteredPins = computed(() => {
  return pins.value.filter(pin => {
    const filter = filters.value.find(f => f.kind === pin.kind)
    if (!filter?.enabled) return false
    
    if (!searchQuery.value) return true
    
    const query = searchQuery.value.toLowerCase()
    return (
      pin.name.toLowerCase().includes(query) ||
      pin.description?.toLowerCase().includes(query) ||
      pin.tags?.some(tag => tag.toLowerCase().includes(query))
    )
  })
})

// Methods
const toggleFilter = (kind: MapPinKind) => {
  const filter = filters.value.find(f => f.kind === kind)
  if (filter) {
    filter.enabled = !filter.enabled
    updateMarkers()
  }
}

const toggleDragMode = () => {
  isDraggingMode.value = !isDraggingMode.value
  createModeEnabled.value = false
  
  if (map) {
    map.getContainer().style.cursor = isDraggingMode.value ? 'move' : ''
  }
  
  // Update all markers draggable state
  markers.forEach((marker, pinId) => {
    const pin = pins.value.find(p => p.id === pinId)
    if (pin) {
      if (isDraggingMode.value) {
        marker.dragging?.enable()
        marker.on('drag', handleMarkerDrag)
        marker.on('dragend', handleMarkerDragEnd)
      } else {
        marker.dragging?.disable()
        marker.off('drag', handleMarkerDrag)
        marker.off('dragend', handleMarkerDragEnd)
      }
    }
  })
}

const enableCreateMode = () => {
  createModeEnabled.value = true
  isDraggingMode.value = false
  if (map) {
    map.getContainer().style.cursor = 'crosshair'
  }
}

const disableCreateMode = () => {
  createModeEnabled.value = false
  if (map && !isDraggingMode.value) {
    map.getContainer().style.cursor = ''
  }
}

const openCreateModal = (x: number, y: number) => {
  createPosition.value = { x, y }
  isCreating.value = true
  disableCreateMode()
}

const cancelCreate = () => {
  isCreating.value = false
  createPosition.value = null
  disableCreateMode()
}

const createPin = (data: Omit<MapPinData, 'id' | 'createdAt' | 'updatedAt'>) => {
  const newPin: MapPinData = {
    ...data,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  pins.value.push(newPin)
  addMarker(newPin)
  isCreating.value = false
  createPosition.value = null
  saveToLocalStorage()
}

const selectPin = (pin: MapPinData) => {
  if (createModeEnabled.value) {
    disableCreateMode()
    return
  }
  if (isDraggingMode.value) {
    return
  }
  selectedPin.value = pin
  isEditing.value = false
}

const startEditing = () => {
  isEditing.value = true
}

const closeModal = () => {
  selectedPin.value = null
  isEditing.value = false
}

const deletePin = (id: string) => {
  pins.value = pins.value.filter(p => p.id !== id)
  const marker = markers.get(id)
  if (marker) {
    marker.remove()
    markers.delete(id)
  }
  selectedPin.value = null
  saveToLocalStorage()
}

const savePin = (updatedPin: MapPinData) => {
  const index = pins.value.findIndex(p => p.id === updatedPin.id)
  if (index !== -1) {
    pins.value[index] = {
      ...updatedPin,
      updatedAt: new Date().toISOString(),
    }
    updateMarker(updatedPin)
    selectedPin.value = null
    isEditing.value = false
    saveToLocalStorage()
  }
}

// Marker drag handlers
const handleMarkerDrag = (e: any) => {
  if (map) {
    map.getContainer().style.cursor = 'grabbing'
  }
}

const handleMarkerDragEnd = (e: any) => {
  if (map) {
    map.getContainer().style.cursor = isDraggingMode.value ? 'move' : ''
  }
  
  const marker = e.target
  const latlng = marker.getLatLng()
  const newX = Math.round(latlng.lng)
  const newY = Math.round(latlng.lat)
  
  const pinId = Array.from(markers.entries())
    .find(([_, m]) => m === marker)?.[0]
  
  if (pinId) {
    const pin = pins.value.find(p => p.id === pinId)
    if (pin) {
      pin.x = newX
      pin.y = newY
      pin.updatedAt = new Date().toISOString()
      saveToLocalStorage()
    }
  }
}

const exportData = () => {
  const data = JSON.stringify(pins.value, null, 2)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `map-pins-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
}

const importData = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string) as MapPinData[]
          pins.value = [...pins.value, ...data]
          data.forEach(pin => addMarker(pin))
          saveToLocalStorage()
        } catch (err) {
          alert('잘못된 파일 형식입니다.')
        }
      }
      reader.readAsText(file)
    }
  }
  input.click()
}

const saveToLocalStorage = () => {
  localStorage.setItem('interactive-map-pins', JSON.stringify(pins.value))
}

const loadFromLocalStorage = () => {
  const saved = localStorage.getItem('interactive-map-pins')
  if (saved) {
    try {
      pins.value = JSON.parse(saved)
    } catch (err) {
      pins.value = [...initialPins]
    }
  } else {
    pins.value = [...initialPins]
  }
}

// Marker management - Icon based with pin shape
const getMarkerIcon = (kind: MapPinKind, isSelected = false) => {
  const config = iconConfig[kind]
  const size = isSelected ? 48 : 40
  
  const simpleSvg = `
    <div style="position: relative; width: ${size}px; height: ${size + 10}px;">
      <svg width="${size}" height="${size + 10}" viewBox="0 0 40 50" style="position: absolute;">
        <path 
          d="M20 0C8.954 0 0 8.954 0 20C0 33.75 20 50 20 50C20 50 40 33.75 40 20C40 8.954 31.046 0 20 0Z" 
          fill="${config.color}"
          stroke="white"
          stroke-width="2.5"
        />
        <circle cx="20" cy="18" r="9" fill="white" fill-opacity="0.25"/>
      </svg>
      <div style="
        position: absolute;
        top: ${size * 0.35}px;
        left: ${size * 0.35}px;
        width: ${size * 0.3}px;
        height: ${size * 0.3}px;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="${size * 0.25}" height="${size * 0.25}" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          ${kind === 'landmark' 
            ? '<path d="M12 2L4 6v14h16V6l-8-4z M12 10v4 M8 14v4 M16 14v4"/>' 
            : '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"/>'
          }
        </svg>
      </div>
    </div>
  `
  
  return L.divIcon({
    className: 'custom-marker',
    html: simpleSvg,
    iconSize: [size, size + 10],
    iconAnchor: [size / 2, size + 10],
    popupAnchor: [0, -(size + 10)],
  })
}

const addMarker = (pin: MapPinData) => {
  if (!map) return
  
  const marker = L.marker([pin.y, pin.x], {
    icon: getMarkerIcon(pin.kind),
    draggable: isDraggingMode.value,
  })
  
  marker.on('click', () => selectPin(pin))
  
  if (isDraggingMode.value) {
    marker.dragging?.enable()
    marker.on('drag', handleMarkerDrag)
    marker.on('dragend', handleMarkerDragEnd)
  }
  
  marker.addTo(map)
  markers.set(pin.id, marker)
}

const updateMarker = (pin: MapPinData) => {
  const marker = markers.get(pin.id)
  if (marker) {
    marker.setLatLng([pin.y, pin.x])
    marker.setIcon(getMarkerIcon(pin.kind))
  }
}

const updateMarkers = () => {
  markers.forEach(marker => marker.remove())
  markers.clear()
  filteredPins.value.forEach(pin => addMarker(pin))
}

watch(searchQuery, () => {
  updateMarkers()
})

watch(isDraggingMode, (newMode) => {
  markers.forEach((marker) => {
    if (newMode) {
      marker.dragging?.enable()
      marker.on('drag', handleMarkerDrag)
      marker.on('dragend', handleMarkerDragEnd)
    } else {
      marker.dragging?.disable()
      marker.off('drag', handleMarkerDrag)
      marker.off('dragend', handleMarkerDragEnd)
    }
  })
})

onMounted(() => {
  if (!mapContainer.value) return
  
  loadFromLocalStorage()
  
  const width = interactiveMapConfig.width
  const height = interactiveMapConfig.height
  
  const bounds: L.LatLngBoundsExpression = [
    [0, 0],
    [height, width],
  ]
  
  map = L.map(mapContainer.value, {
    crs: L.CRS.Simple,
    minZoom: interactiveMapConfig.minZoom,
    maxZoom: interactiveMapConfig.maxZoom,
    zoomControl: true,
    attributionControl: false,
    scrollWheelZoom: true,
    doubleClickZoom: false,
  })
  
  const tilesPath = '/tiles/luxterra'
  
  fetch(`${tilesPath}/0/0-0.webp`, { method: 'HEAD' })
    .then(response => {
      if (response.ok) {
        L.tileLayer(`${tilesPath}/{z}/{x}-{y}.webp`, {
          tileSize: interactiveMapConfig.tileSize,
          noWrap: true,
          bounds: bounds,
          minZoom: 0,
          maxZoom: interactiveMapConfig.maxZoom,
        }).addTo(map)
        console.log('🗺️ 타일 맵 로드됨')
      } else {
        L.imageOverlay('/maps/luxterra-preview.jpg', bounds).addTo(map)
        console.log('🖼️ 이미지 오버레이 로드됨')
      }
    })
    .catch(() => {
      L.imageOverlay('/maps/luxterra-preview.jpg', bounds).addTo(map)
      console.log('🖼️ 이미지 오버레이 로드됨')
    })
  
  map.fitBounds(bounds)
  pins.value.forEach(pin => addMarker(pin))
  
  map.on('click', (e) => {
    if (createModeEnabled.value) {
      const x = Math.round(e.latlng.lng)
      const y = Math.round(e.latlng.lat)
      openCreateModal(x, y)
    }
  })
  
  map.on('dblclick', (e) => {
    if (!isDraggingMode.value) {
      const x = Math.round(e.latlng.lng)
      const y = Math.round(e.latlng.lat)
      openCreateModal(x, y)
    }
  })
  
  map.on('contextmenu', () => {
    if (createModeEnabled.value || isDraggingMode.value) {
      createModeEnabled.value = false
      isDraggingMode.value = false
      if (map) {
        map.getContainer().style.cursor = ''
      }
    }
  })
  
  const handleEsc = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      createModeEnabled.value = false
      isDraggingMode.value = false
      if (map) {
        map.getContainer().style.cursor = ''
      }
    }
  }
  document.addEventListener('keydown', handleEsc)
  
  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleEsc)
  })
  
  isLoading.value = false
})

onBeforeUnmount(() => {
  map?.remove()
  map = null
})
</script>

<style>
.custom-marker {
  background: transparent;
  border: none;
  transition: transform 0.2s;
}

.custom-marker:hover {
  transform: scale(1.1);
  cursor: pointer;
}

.leaflet-marker-pane img {
  max-width: none !important;
}

.leaflet-top.leaflet-right {
  margin-top: 1rem;
  margin-right: 1rem;
}

.leaflet-control-zoom {
  border: none !important;
}

.leaflet-control-zoom-in,
.leaflet-control-zoom-out {
  background-color: rgba(23, 23, 23, 0.9) !important;
  color: white !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

.leaflet-control-zoom-in:hover,
.leaflet-control-zoom-out:hover {
  background-color: rgba(37, 37, 37, 0.9) !important;
}

.leaflet-marker-draggable {
  cursor: move !important;
}
</style>
