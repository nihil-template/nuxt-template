export type OpenGraphType
  = | 'article'
  | 'book'
  | 'music.song'
  | 'music.album'
  | 'music.playlist'
  | 'music.radio_station'
  | 'profile'
  | 'website'
  | 'video.tv_show'
  | 'video.other'
  | 'video.movie'
  | 'video.episode';

export interface SiteMetadata {
  title: string;
  url: string;
  description?: string;
  author?: string;
  keywords?: string;
  type?: OpenGraphType;
  tags?: string;
  section?: string;
  created?: string;
  updated?: string;
  imageLink?: string;
  imageAlt?: string;
  robots?:
    | 'index, follow'
    | 'noindex, nofollow'
    | 'index, nofollow'
    | 'noindex, follow';
}

export interface SiteLink {
  icon: string;
  link: string;
  label: string;
}

export interface SiteConfig {
  site: {
    title: string;
    description: string;
    keywords: string;
    url: string;
    type: OpenGraphType;
    version: string;
    startedYear: number;
  };
  author: {
    name: string;
    url: string;
  };
  images: {
    logo: string,
    cover: {
      normal: string,
      dark: string,
    },
    alt: string,
  },
  google: {
    verification: string;
    adSrc: string;
    analyticsId: string;
  };
  api: {
    route: string;
  };
  links: SiteLink[];
}
