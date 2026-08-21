import type {
  MutationOptionOverrides,
} from '~/types/query.types';

import type {
  CreateUserInput,
  User,
} from '~/types/user.types';

import {
  usePostMutation,
} from '~/composables/query';

import {
  usersKeys,
} from '~/keys/users.keys';

export function useCreateUser(
  mutationOptions: MutationOptionOverrides<
    User,
    CreateUserInput
  > = {},
) {
  return usePostMutation<
    User,
    CreateUserInput
  >({
    key: usersKeys.create.queryKey,
    url: '/api/users',
    mutationOptions,
  });
}
