import { buildFetchRequestOptions, createMutationResult, normalizeRequestInput } from './shared';
import type { QueryBody, QueryParams, QueryRequestInput } from './types';

export function usePost<
  TResponse,
  TBody extends QueryBody = QueryBody,
  TParams extends QueryParams = QueryParams,
>(
  url: string,
  request: QueryRequestInput<TBody, TParams> = {},
) {
  return createMutationResult<TResponse>(async (overrides = {}) => {
    const state = normalizeRequestInput('POST', {
      ...request,
      ...overrides,
      params: overrides.params ?? request.params,
      body: overrides.body ?? request.body,
      headers: overrides.headers ?? request.headers,
      options: {
        ...(request.options ?? {}),
        ...(overrides.options ?? {}),
      },
    });

    const result = await $fetch<TResponse>(url, buildFetchRequestOptions(state) as never);
    return result;
  });
}
