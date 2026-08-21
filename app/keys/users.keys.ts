import {
  createQueryKeys,
} from '@lukemorales/query-key-factory';

import type {
  UsersParams,
} from '~/types/user.types';

export const usersKeys = createQueryKeys(
  'users',
  {
    list: (
      params: UsersParams = {},
    ) => [
      params,
    ],
    detail: (
      userId: string,
    ) => [
      userId,
    ],
    create: null,
    update: (
      userId: string,
    ) => [
      userId,
    ],
    remove: (
      userId: string,
    ) => [
      userId,
    ],
  },
);
