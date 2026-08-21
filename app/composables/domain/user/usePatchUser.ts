import type {
  MutationOptionOverrides,
} from '~/types/query.types';

import type {
  UpdateUserInput,
  User,
} from '~/types/user.types';

import {
  usePatchMutation,
} from '~/composables/query';

import {
  usersKeys,
} from '~/keys/users.keys';

export function usePatchUser(
  userId: string,
  mutationOptions: MutationOptionOverrides<
    User,
    Partial<UpdateUserInput>
  > = {},
) {
  return usePatchMutation<
    User,
    Partial<UpdateUserInput>
  >({
    key: usersKeys.update(userId).queryKey,
    url: `/api/users/${userId}`,
    mutationOptions,
  });
}
