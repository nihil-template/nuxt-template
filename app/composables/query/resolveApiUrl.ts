import { appConfig } from '~/config/app.config';

export function resolveApiUrl(url: string) {
  const baseUrl = appConfig.api.route.replace(/\/$/, '');
  const path = url.replace(/^\//, '');

  return `${baseUrl}/${path}`;
}
