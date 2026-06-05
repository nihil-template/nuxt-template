export const atlasMapConfig = {
  id: 'luxterra',
  name: '룩스테라 전도',

  width: 16320,
  height: 9258,

  minZoom: -4,
  maxZoom: 2,

  tileSize: 512,

  tileUrl: '/tiles/luxterra/{z}/{x}/{y}.webp',
} as const;
