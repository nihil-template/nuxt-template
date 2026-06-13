import type { MapPinData } from '~/types/interactive-map'

export const initialPins: MapPinData[] = [
  {
    id: 'landmark-1',
    kind: 'landmark',
    name: '쿠아리온 왕국',
    x: 8160,
    y: 4629,
    description: '선조의 석상을 중심으로 기억과 혈통의 권위를 보존하는 신성 왕국입니다.',
    imageUrl: '/maps/luxterra-preview.jpg',
    tags: ['왕국', '신성 왕국'],
    visibility: 'public',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'session-1',
    kind: 'session',
    name: '세션 1: 시작',
    x: 7500,
    y: 4200,
    description: '모험이 시작된 장소입니다.',
    tags: ['세션 기록'],
    visibility: 'public',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]
