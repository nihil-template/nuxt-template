import type { UseFetchOptions } from 'nuxt/app';

import { normalizeRequestInput } from './shared';
import type { QueryBody, QueryParams, QueryRequestInput } from './types';

export function useGet<
  TResponse,
  TBody extends QueryBody = QueryBody,
  TParams extends QueryParams = QueryParams,
>(
  url: string,
  request: QueryRequestInput<TBody, TParams> = {},
  options: Omit<UseFetchOptions<TResponse>, 'body' | 'headers' | 'method' | 'query'> = {},
) {
  const normalized = normalizeRequestInput('GET', request);

  return useFetch<TResponse>(url, {
    method: 'GET',
    query: normalized.query,
    body: normalized.body as QueryBody,
    headers: normalized.headers,
    ...normalized.fetchOptions,
    ...options,
  } as never);
}
