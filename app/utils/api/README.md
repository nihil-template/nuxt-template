# API Fetcher 사용 가이드

`app/utils/api`는 Vue Query와 독립된 HTTP 요청 유틸리티입니다.

- `$fetch` 호출을 한 곳으로 모읍니다.
- `GET / POST / PUT / PATCH / DELETE`를 메서드로 제공합니다.
- Vue Query 없이도 단독 호출할 수 있습니다.
- 인증, `baseURL`, 공통 header, interceptor 정책은 이 계층에서 확장합니다.

## 기본 사용

```ts
import {
  api,
} from '~/utils/api';

const users = await api.get<User[]>('/api/users');
```

## Query Parameter

```ts
const users = await api.get<User[]>('/api/users', {
  params: {
    page: 1,
    keyword: 'nihil',
  },
});
```

## POST

```ts
const user = await api.post<User, CreateUserInput>(
  '/api/users',
  {
    body: {
      name: 'NIHIL',
      email: 'nihil@example.com',
    },
  },
);
```

## PUT / PATCH / DELETE

```ts
await api.put<User, UpdateUserInput>('/api/users/1', {
  body: input,
});

await api.patch<User, Partial<UpdateUserInput>>('/api/users/1', {
  body: input,
});

await api.delete<void>('/api/users/1');
```

## Header

```ts
await api.get<User[]>('/api/users', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

## `$fetch` 옵션

```ts
await api.get<User[]>('/users', {
  options: {
    baseURL: 'https://example.com/api',
    retry: 2,
    timeout: 10_000,
  },
});
```

## 구조

```text
$fetch
  ↓
utils/api
  ↓
composables/query
  ↓
composables/domain
```
