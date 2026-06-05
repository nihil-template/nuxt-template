<template>
  <div class="h-full w-full">
    <div ref="mapContainer" class="h-full w-full bg-neutral-900"></div>

    <AtlasInfoPanel
      v-if="selectedPin"
      :pin="selectedPin"
      @close="selectedPin = null"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import type { AtlasPin } from '~/types/map.types'
import { atlasMapConfig } from '~/data/map/map-config'
import { atlasPins } from '~/data/map/pins'

const mapContainer = ref<HTMLElement | null>(null)
const selectedPin = ref<AtlasPin | null>(null)

let map: any = null
let markers: any[] = []

const initializeMap = () => {
  if (!mapContainer.value) return

  // Leaflet 은 동적 import 로 로드 (SSR 문제 회피)
  import('leaflet').then((L) => {
    const bounds: [[number, number], [number, number]] = [
      [0, 0],
      [atlasMapConfig.height, atlasMapConfig.width],
    ]

    map = L.map(mapContainer.value, {
      crs: L.CRS.Simple,
      minZoom: atlasMapConfig.minZoom,
      maxZoom: atlasMapConfig.maxZoom,
      maxBounds: bounds,
      maxBoundsViscosity: 1.0,
    })

    // 테스트용 이미지 오버레이
    L.imageOverlay('/maps/luxterra-preview.jpg', bounds).addTo(map)

    // 초기 뷰 설정 (전체 지도가 보이도록)
    map.fitBounds(bounds)

    // 핀 추가
    atlasPins.forEach((pin) => {
      const marker = L.marker([pin.y, pin.x], {
        title: pin.name,
      })

      marker.on('click', () => {
        selectedPin.value = pin
      })

      marker.addTo(map)
      markers.push(marker)
    })

    // 디버그: 클릭 좌표 출력
    map.on('click', (event: any) => {
      console.log({
        x: Math.round(event.latlng.lng),
        y: Math.round(event.latlng.lat),
      })
    })
  })
}

onMounted(() => {
  initializeMap()
})

onBeforeUnmount(() => {
  if (map) {
    map.remove()
    map = null
  }
  markers = []
})
</script>

<style>
@import 'leaflet/dist/leaflet.css';
</style>
