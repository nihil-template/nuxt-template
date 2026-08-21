import type {
  QueryOptionOverrides,
} from '~/types/query.types';

import type {
  User,
} from '~/types/user.types';

import {
  useGetQuery,
} from '~/composables/query';

import {
  usersKeys,
} from '~/keys/users.keys';

type UserQueryOptions = QueryOptionOverrides<
  User
>;

export function useGetUser(
  userId: string,
  queryOptions: UserQueryOptions = {},
) {
  return useGetQuery<
    User
  >({
    key: usersKeys.detail(userId).queryKey,
    url: `/api/users/${userId}`,
    queryOptions,
  });
}
