import { useMutation } from '@tanstack/vue-query';
import type {
  DefaultError,
  MutationKey,
  MutationOptions
} from '@tanstack/vue-query';
import { toValue } from 'vue';
import type { MaybeRefOrGetter } from 'vue';

import { resolveApiUrl } from './resolveApiUrl';

import type { BaseResponse } from '~/types/common.types';

type FetchOptions = NonNullable<Parameters<typeof $fetch>[1]>;
type MutationMethod = 'DELETE' | 'PATCH' | 'POST' | 'PUT';
type RequestMutationResponse<TData> = BaseResponse<TData>;
type MutationKeySource<TMutationKey extends MutationKey> = TMutationKey
  | { mutationKey: TMutationKey }
  | { queryKey: TMutationKey };

type RequestMutationOptions<
  TData,
  TError,
  TVariables,
  TOnMutateResult
> = Omit<
  MutationOptions<
    RequestMutationResponse<TData>,
    TError,
    TVariables,
    TOnMutateResult
  >,
  'mutationFn' | 'mutationKey'
>;

export interface UseRequestMutationOptions<
  TData,
  TError,
  TVariables,
  TOnMutateResult,
  TMutationKey extends MutationKey
> {
  url: MaybeRefOrGetter<string>;
  key: MaybeRefOrGetter<MutationKeySource<TMutationKey>>;
  fetchOptions?: MaybeRefOrGetter<Omit<FetchOptions, 'body' | 'method'>>;
  mutationOptions?: RequestMutationOptions<
    TData,
    TError,
    TVariables,
    TOnMutateResult
  >;
}

function resolveMutationKey<TMutationKey extends MutationKey>(
  key: MutationKeySource<TMutationKey>
) {
  if ('mutationKey' in key) {
    return key.mutationKey;
  }

  if ('queryKey' in key) {
    return key.queryKey;
  }

  return key;
}

export function useRequestMutation<
  TData,
  TVariables = void,
  TError = DefaultError,
  TOnMutateResult = unknown,
  TMutationKey extends MutationKey = MutationKey
>(
  method: MutationMethod,
  {
    url,
    key,
    fetchOptions,
    mutationOptions,
  }: UseRequestMutationOptions<
    TData,
    TError,
    TVariables,
    TOnMutateResult,
    TMutationKey
  >
) {
  return useMutation<
    RequestMutationResponse<TData>,
    TError,
    TVariables,
    TOnMutateResult
  >(() => ({
    ...mutationOptions,
    mutationKey: resolveMutationKey(toValue(key)) as MutationKey,
    mutationFn: (variables) => $fetch<RequestMutationResponse<TData>>(resolveApiUrl(toValue(url)), {
      ...toValue(fetchOptions),
      method,
      body: variables as FetchOptions['body'],
    }),
  }));
}
