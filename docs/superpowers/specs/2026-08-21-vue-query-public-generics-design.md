# Vue Query 공개 제네릭 축소 설계

## 목적

도메인 훅 작성자가 Query Key, error, context, params 타입을 반복하지 않고, GET에는 응답 타입 하나, mutation에는 응답 타입과 body 타입 두 개만 선언하게 한다.

## 공개 계약

```ts
useGetQuery<User[]>({
  key: usersKeys.list(params).queryKey,
  params,
  url: '/api/users',
});

usePatchMutation<User, Partial<UpdateUserInput>>({
  key: usersKeys.update(userId).queryKey,
  url: `/api/users/${userId}`,
});
```

- `useGetQuery<TResponse>`만 공개한다.
- `usePostMutation`, `usePutMutation`, `usePatchMutation`, `useDeleteMutation`은 `use*Mutation<TResponse, TBody = void>`만 공개한다.
- error는 `Error`, mutation context는 `unknown`으로 고정한다.
- key와 params는 입력 객체에서 받고, 별도 제네릭으로 노출하지 않는다.
- mutation의 `mutate`와 `mutateAsync`에는 body를 직접 전달한다. params는 훅 생성 시 입력 객체에서 지정한다.

## 타입 경계

- `ApiParams`는 개별 필드 인터페이스를 허용하는 객체 타입으로 둔다.
- `QueryOptionOverrides<TResponse>`와 `MutationOptionOverrides<TResponse, TBody>`도 공개 제네릭 수를 같은 원칙으로 제한한다.
- TanStack Vue Query의 반응형 Query Key 타입 불일치는 `useGetQuery` 내부에서만 처리한다.

## 영향 범위

- `app/types/api.types.ts`, `app/types/query.types.ts`
- `app/composables/query/useGetQuery.ts` 및 네 개 mutation 훅
- `app/composables/domain/user/`의 여섯 훅
- query composable 테스트와 사용 안내 문서

## 완료 기준

- 사용자 도메인 훅에서 GET은 한 개, mutation은 두 개 이하의 제네릭만 사용한다.
- 목록 params와 mutation body가 런타임 요청에 그대로 전달된다.
- 대상 파일 lint, 타입 검사에서 이번 계약 관련 오류가 없어야 한다.
