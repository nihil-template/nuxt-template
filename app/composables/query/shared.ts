import { ref, shallowRef } from 'vue';

import type { MutationResult,
  MutationState,
  NormalizedRequest,
  QueryBody,
  QueryFetchOptions,
  QueryMethod,
  QueryParams,
  QueryRequestInput } from './types';

export function normalizeRequestInput<
  TBody = QueryBody,
  TParams extends QueryParams = QueryParams,
>(
  method: QueryMethod,
  input: QueryRequestInput<TBody, TParams> = {},
): NormalizedRequest<TBody, TParams> {
  const { params, body, headers, options } = input;

  return {
    method,
    query: params,
    body,
    headers,
    fetchOptions: (options ?? {}) as QueryFetchOptions,
  };
}

export function buildFetchRequestOptions<
  TBody = QueryBody,
  TParams extends QueryParams = QueryParams,
>(
  request: NormalizedRequest<TBody, TParams>,
) {
  return {
    method: request.method,
    query: request.query,
    body: request.body,
    headers: request.headers,
    ...request.fetchOptions,
  };
}

export function createMutationState<TData, TError = Error>(): MutationState<TData, TError> {
  return {
    pending: ref(false),
    data: shallowRef<TData>(),
    error: shallowRef<TError | null>(null),
  };
}

export function createMutationResult<TData, TError = Error>(
  execute: MutationResult<TData, TError>['execute'],
): MutationResult<TData, TError> {
  const state = createMutationState<TData, TError>();

  return {
    ...state,
    async execute(overrides) {
      state.pending.value = true;
      state.error.value = null;

      try {
        const result = await execute(overrides);
        state.data.value = result;
        return result;
      } catch (error) {
        state.error.value = error as TError;
        throw error;
      } finally {
        state.pending.value = false;
      }
    },
    reset() {
      state.pending.value = false;
      state.data.value = undefined;
      state.error.value = null;
    },
  };
}
