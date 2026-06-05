import { useQuery } from '@tanstack/vue-query';
import type { DefaultError, QueryKey, UseQueryOptions } from '@tanstack/vue-query';
import { toValue } from 'vue';
import type { MaybeRefOrGetter } from 'vue';

import { resolveApiUrl } from './resolveApiUrl';

import type { BaseResponse } from '~/types/common.types';

type FetchOptions = NonNullable<Parameters<typeof $fetch>[1]>;
type QueryKeySource<TQueryKey extends QueryKey> = TQueryKey | { queryKey: TQueryKey };
type GetResponse<TData> = BaseResponse<TData>;

type UseGetQueryOptions<
  TData,
  TError
> = Omit<
  UseQueryOptions<
    GetResponse<TData>,
    TError,
    GetResponse<TData>,
    GetResponse<TData>,
    QueryKey
  >,
  'enabled' | 'queryFn' | 'queryKey'
>;

interface UseGetOptions<
  TData,
  TError,
  TQueryKey extends QueryKey
> {
  url: MaybeRefOrGetter<string>;
  key: MaybeRefOrGetter<QueryKeySource<TQueryKey>>;
  enabled?: MaybeRefOrGetter<boolean>;
  fetchOptions?: MaybeRefOrGetter<Omit<FetchOptions, 'method'>>;
  queryOptions?: UseGetQueryOptions<TData, TError>;
}

function resolveQueryKey<TQueryKey extends QueryKey>(key: QueryKeySource<TQueryKey>) {
  if ('queryKey' in key) {
    return key.queryKey;
  }

  return key;
}

export function useGet<
  TData,
  TError = DefaultError,
  TQueryKey extends QueryKey = QueryKey
>({
  url,
  key,
  enabled = true,
  fetchOptions,
  queryOptions,
}: UseGetOptions<TData, TError, TQueryKey>) {
  const query = useQuery<
    GetResponse<TData>,
    TError,
    GetResponse<TData>,
    QueryKey
  >(() => ({
    ...queryOptions,
    queryKey: resolveQueryKey(toValue(key)) as QueryKey,
    queryFn: () => $fetch<GetResponse<TData>>(resolveApiUrl(toValue(url)), {
      ...toValue(fetchOptions),
      method: 'GET',
    }),
    enabled: toValue(enabled),
  }));

  return {
    ...query,
    execute: query.refetch,
  };
}
