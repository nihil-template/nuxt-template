import {
  computed,
  toValue,
} from 'vue';

import {
  useMutation,
} from '@tanstack/vue-query';

import type {
  MutationKey,
} from '@tanstack/vue-query';

import {
  api,
} from '~/utils/api';

import type {
  MutationInput,
} from '~/types/query.types';

export function usePatchMutation<
  TData,
  TVariables = void,
>(
  input: MutationInput<TData, TVariables>,
) {
  const mutationKey = computed<MutationKey>(() => toValue(input.key));

  return useMutation<TData, Error, TVariables, unknown>(
    {
      ...input.mutationOptions,
      mutationKey,
      mutationFn: async (variables: TVariables) => {
        return await api.patch<TData, TVariables>(
          toValue(input.url),
          {
            params: toValue(input.params),
            body: variables,
            headers: toValue(input.headers),
            options: toValue(input.fetchOptions),
          },
        );
      },
    },
    input.queryClient,
  );
}
