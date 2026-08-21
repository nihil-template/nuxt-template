import type {
  MutationOptionOverrides,
} from '~/types/query.types';

import {
  useDeleteMutation,
} from '~/composables/query';

import {
  usersKeys,
} from '~/keys/users.keys';

export function useDeleteUser(
  userId: string,
  mutationOptions: MutationOptionOverrides<
    undefined
  > = {},
) {
  return useDeleteMutation<
    undefined
  >({
    key: usersKeys.remove(userId).queryKey,
    url: `/api/users/${userId}`,
    mutationOptions,
  });
}
