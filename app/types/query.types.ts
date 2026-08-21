import type {
  MutationKey,
  QueryClient,
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/vue-query';

import type {
  MaybeRefOrGetter,
} from 'vue';

import type {
  ApiFetchOptions,
  ApiParams,
} from '~/types/api.types';

export type QueryOptionOverrides<
  TData,
> = Omit<
  UseQueryOptions<TData, Error, TData, QueryKey>,
  'queryFn' | 'queryKey'
>;

export interface GetQueryInput<TData> {
  key: MaybeRefOrGetter<QueryKey>;
  url: MaybeRefOrGetter<string>;
  params?: MaybeRefOrGetter<ApiParams | undefined>;
  headers?: MaybeRefOrGetter<HeadersInit | undefined>;
  fetchOptions?: MaybeRefOrGetter<ApiFetchOptions | undefined>;
  queryOptions?: QueryOptionOverrides<TData>;
  queryClient?: QueryClient;
}

export type MutationOptionOverrides<
  TData,
  TVariables = void,
> = Omit<
  UseMutationOptions<TData, Error, TVariables, unknown>,
  'mutationFn' | 'mutationKey'
>;

export interface MutationInput<
  TData,
  TVariables = void,
> {
  key: MaybeRefOrGetter<MutationKey>;
  url: MaybeRefOrGetter<string>;
  params?: MaybeRefOrGetter<ApiParams | undefined>;
  headers?: MaybeRefOrGetter<HeadersInit | undefined>;
  fetchOptions?: MaybeRefOrGetter<ApiFetchOptions | undefined>;
  mutationOptions?: MutationOptionOverrides<TData, TVariables>;
  queryClient?: QueryClient;
}
