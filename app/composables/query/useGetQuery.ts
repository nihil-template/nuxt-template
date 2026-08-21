import {
  computed,
  toValue,
} from 'vue';

import {
  useQuery,
} from '@tanstack/vue-query';

import type {
  QueryKey,
  UseQueryOptions,
} from '@tanstack/vue-query';

import {
  api,
} from '~/utils/api';

import type {
  GetQueryInput,
} from '~/types/query.types';

type QueryKeyOption<TOptions> = TOptions extends {
  queryKey?: infer TQueryKey;
}
  ? TQueryKey
  : never;

export function useGetQuery<
  TData,
>(
  input: GetQueryInput<TData>,
) {
  const queryKey = computed<QueryKey>(() => toValue(input.key));

  return useQuery<TData, Error, TData, QueryKey>(
    {
      ...input.queryOptions,
      queryKey: queryKey as QueryKeyOption<
        UseQueryOptions<
          TData,
          Error,
          TData,
          TData,
          QueryKey
        >
      >,
      queryFn: async () => {
        return await api.get<TData>(
          toValue(input.url),
          {
            params: toValue(input.params),
            headers: toValue(input.headers),
            options: toValue(input.fetchOptions),
          },
        );
      },
    },
    input.queryClient,
  );
}
