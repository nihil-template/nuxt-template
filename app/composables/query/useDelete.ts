import type { DefaultError, MutationKey } from '@tanstack/vue-query';

import {
  useRequestMutation,
  type UseRequestMutationOptions
} from './useRequestMutation';

export function useDelete<
  TData,
  TVariables = void,
  TError = DefaultError,
  TOnMutateResult = unknown,
  TMutationKey extends MutationKey = MutationKey
>(
  options: UseRequestMutationOptions<
    TData,
    TError,
    TVariables,
    TOnMutateResult,
    TMutationKey
  >
) {
  return useRequestMutation<
    TData,
    TVariables,
    TError,
    TOnMutateResult,
    TMutationKey
  >('DELETE', options);
}
