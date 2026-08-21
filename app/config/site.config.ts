import type { SiteConfig } from '~/types/common.types.ts';
import { linkConfig } from '~/config/link.config.ts';
import { navConfig } from '~/config/nav.config.ts';

export const siteConfig: SiteConfig = {
  site: {
    title: '사이트 이름',
    description: '사이트 설명',
    keywords: '사이트, 키워드',
    url: process.env.NODE_ENV === 'production'
      ? 'http://localhost:3000'
      : 'http://localhost:3000',
    type: 'website' as const,
    version: '1.0.0',
    startedYear: 2026,
  },
  author: {
    name: 'NIHILncunia',
    url: 'https://github.com/nihilncunia',
  },
  images: {
    logo: {
      normal: '/images/nihilncunia-logo.svg',
      dark: '/images/nihilncunia-logo-w.svg',
      alt: '로고',
    },
    cover: {
      normal: '/images/nihil-web-logo.png',
      dark: '/images/nihil-web-logo-w.png',
      alt: '사이트 이미지',
    },
  },
  google: {
    verification: '',
    adSrc: '',
    analyticsId: '',
  },
  api: {
    route: '/api',
  },
  links: linkConfig,
  navigation: navConfig,
} as const;
