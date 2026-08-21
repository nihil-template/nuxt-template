import type {
  QueryOptionOverrides,
} from '~/types/query.types';

import type {
  User,
  UsersParams,
} from '~/types/user.types';

import {
  useGetQuery,
} from '~/composables/query';

import {
  usersKeys,
} from '~/keys/users.keys';

type UsersQueryOptions = QueryOptionOverrides<
  User[]
>;

export function useGetUsers(
  params: UsersParams = {},
  queryOptions: UsersQueryOptions = {},
) {
  return useGetQuery<
    User[]
  >({
    key: usersKeys.list(params).queryKey,
    url: '/api/users',
    params,
    queryOptions,
  });
}
