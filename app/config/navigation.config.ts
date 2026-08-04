export interface NavigationItem {
  label: string;
  to: string;
  icon: string;
}

export const navigationItems: NavigationItem[] = [
  {
    label: '대시보드',
    to: '/',
    icon: 'mdi:view-dashboard-outline',
  },
  {
    label: '문서',
    to: '/docs',
    icon: 'mdi:file-document-outline',
  },
  {
    label: '설정',
    to: '/settings',
    icon: 'mdi:cog-outline',
  },
];
