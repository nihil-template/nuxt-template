import type { AtlasPin } from '~/types/map.types';

export const atlasPins: AtlasPin[] = [
  {
    id: 'kuarion-kingdom',
    kind: 'kingdom',
    name: '쿠아리온 왕국',
    x: 4200,
    y: 3100,
    summary: '선조의 석상을 중심으로 기억과 혈통의 권위를 보존하는 신성 왕국.',
    imageUrl: '/images/locations/kuarion.jpg',
    notionUrl: 'https://www.notion.so/...',
    tags: [ '왕국', '신성 왕국', '골리앗', ],
    visibility: 'public',
  },
  {
    id: 'session-54',
    kind: 'session',
    name: '54 화: 모험과 신도와 유령',
    x: 3980,
    y: 3280,
    summary: '일행이 쿠아리온으로 향하던 길에서 안개 지대와 보육원 사건의 단서를 발견했다.',
    notionUrl: 'https://www.notion.so/...',
    tags: [ '세션 기록', '안개', '쿠아리온', ],
    visibility: 'public',
    sessionNo: 54,
    sessionTitle: '룩스테라 - 모험과 신도와 유령',
    sessionDate: '2026-05-31',
    relatedPinIds: [ 'kuarion-kingdom', ],
  },
] as const;
