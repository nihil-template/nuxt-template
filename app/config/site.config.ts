import type { SiteConfig } from '~/types/common.types.ts';

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
    logo: '/images/nihilncunia-logo.svg',
    cover: {
      normal: '/images/nihil-web-logo.png',
      dark: '/images/nihil-web-logo-w.png',
    },
    alt: '로고',
  },
  google: {
    verification: '',
    adSrc: '',
    analyticsId: '',
  },
  api: {
    route: '/api',
  },
  links: [
    {
      icon: 'mdi:github',
      link: 'https://github.com/nihilncunia',
      label: 'GitHub',
    },
  ],
  navigation: [
    {
      label: '홈',
      to: '/',
    },
  ],
} as const;
