import type {
  MutationOptionOverrides,
} from '~/types/query.types';

import type {
  UpdateUserInput,
  User,
} from '~/types/user.types';

import {
  usePutMutation,
} from '~/composables/query';

import {
  usersKeys,
} from '~/keys/users.keys';

export function useUpdateUser(
  userId: string,
  mutationOptions: MutationOptionOverrides<
    User,
    UpdateUserInput
  > = {},
) {
  return usePutMutation<
    User,
    UpdateUserInput
  >({
    key: usersKeys.update(userId).queryKey,
    url: `/api/users/${userId}`,
    mutationOptions,
  });
}
