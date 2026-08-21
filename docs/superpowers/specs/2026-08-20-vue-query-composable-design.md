# Vue Query 전용 Composable 구조 설계

## 목적

기존 Nuxt `useFetch` 및 `$fetch` 기반 API composable을 `app/composables/api/`로 이전하고, `app/composables/query/`를 TanStack Vue Query 전용 계층으로 전환한다. 모든 Vue Query custom hook은 요청 fetcher를 내부에서 구성하며, 호출부에는 fetch 함수가 노출되지 않는다.

## 결정 사항

- 기반 훅은 `useGetQuery`, `usePostMutation`, `usePutMutation`, `usePatchMutation`, `useDeleteMutation`으로 제공한다.
- 실제 앱 기능은 `useDocumentListQuery`, `useCreateDocumentMutation`처럼 도메인 훅을 만들어 기반 훅을 감싼다.
- query key는 호출부의 임의 배열이 아니라 `app/keys/`의 도메인별 Key Builder가 생성한다.
- `useGetQuery`의 자동 실행은 기본적으로 차단한다. 기본 `enabled` 값은 `false`이며, 반환된 `refetch()`로 원하는 시점에 요청을 실행한다.
- `queryOptions.enabled`에는 `true` 또는 반응형 조건을 전달할 수 있다. `enabled: true`인 경우에만 자동 실행을 허용한다.
- `queryOptions` 및 `mutationOptions`는 외부에서 전달할 수 있다. 단, fetcher 소유권을 보장하기 위해 `queryKey`, `queryFn`, `mutationFn`은 기반 훅이 내부에서 설정한다.
- Vue Query SSR 및 hydration 기반은 제공한다. 다만 SSR prefetch는 기본 동작이 아니며, 도메인 훅이 명시적으로 선택할 때만 수행한다.

## 폴더 구조

```text
app/
├─ composables/
│  ├─ api/                         # 이전된 Nuxt useFetch/$fetch 기반 API composable
│  └─ query/                       # TanStack Vue Query 전용
│     ├─ fetcher.ts
│     ├─ types.ts
│     ├─ useGetQuery.ts
│     ├─ usePostMutation.ts
│     ├─ usePutMutation.ts
│     ├─ usePatchMutation.ts
│     └─ useDeleteMutation.ts
├─ keys/
│  ├─ README.md
│  ├─ document.query-keys.ts
│  └─ user.query-keys.ts
└─ plugins/
   └─ vue-query.ts
```

## 기반 훅 계약

### `useGetQuery`

`useGetQuery`는 `queryKey`, URL, query params, fetch 옵션, Vue Query 옵션을 받는다. 내부 fetcher는 `$fetch`를 사용하며, `queryOptions`에 전달된 옵션과 합쳐 `useQuery`를 호출한다.

```ts
const query = useGetQuery({
  queryKey: documentQueryKeys.list({
    projectId,
  }),
  url: '/api/documents',
  params: {
    projectId,
  },
  queryOptions: {
    enabled: false,
    staleTime: 30_000,
  },
});

await query.refetch();
```

기반 훅은 `queryOptions.enabled`를 제공하지 않으면 `false`를 적용한다. 이 선택은 수동 요청을 위해 `refetch()`를 반드시 사용할 수 있어야 하기 때문이다.

### Mutation 훅

각 mutation 훅은 URL, 기본 params 또는 body, fetch 옵션, `mutationOptions`를 받고 내부 `mutationFn`을 구성한다. 실행 시에는 `mutate` 또는 `mutateAsync`에 params 및 body override를 전달한다.

```ts
const mutation = usePostMutation({
  url: '/api/documents',
  mutationOptions: {
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: documentQueryKeys.lists(),
      });
    },
  },
});

await mutation.mutateAsync({
  body: {
    title: '새 문서',
  },
});
```

## Query Key Builder

`app/keys/`는 도메인별 key 파일과 공통 사용 문서를 둔다. 키 파일은 `all`, 컬렉션 범위, 개별 리소스 범위를 계층적으로 만든다.

```ts
export const documentQueryKeys = {
  all: () => [ 'documents' ] as const,
  lists: () => [ ...documentQueryKeys.all(), 'list' ] as const,
  list: (
    params: DocumentListParams,
  ) => [ ...documentQueryKeys.lists(), params ] as const,
  detail: (
    documentId: string,
  ) => [ ...documentQueryKeys.all(), 'detail', documentId ] as const,
};
```

`app/keys/README.md`에는 다음을 기록한다.

- 키 계층과 파일명 규칙
- 기반 훅 및 도메인 훅에서의 사용 예시
- 목록, 상세, 전체 범위의 `invalidateQueries` 예시
- key params의 직렬화 가능성과 안정성 규칙
- 새 도메인 key 파일을 추가하는 절차

## SSR 및 Hydration

플러그인은 요청별 `QueryClient`를 제공하고, 서버에서 성공한 query cache를 dehydrate한 뒤 클라이언트에서 hydrate한다. 일반 `useGetQuery`는 기본 `enabled: false`이므로 SSR 요청을 발생시키지 않는다.

초기 HTML에 데이터가 필요한 도메인 훅은 명시적 SSR 옵션을 통해 server prefetch를 요청한다. 해당 훅은 서버에서 query를 prefetch 또는 suspense하고, hydration된 cache를 클라이언트가 재사용한다. 인증 헤더나 사용자별 데이터 전달 방식은 API 인증 구조가 결정된 뒤 도메인 훅에서 별도로 검토한다.

## 이전 범위

- 기존 `app/composables/query/`의 Nuxt fetch 구현 및 의존 테스트를 `app/composables/api/`와 그 경로에 맞는 테스트로 이전한다.
- 기존 공개 API에 의존하는 앱 코드는 현재 없으므로, 템플릿 계약 교체 과정에서 하위 호환 alias는 제공하지 않는다.
- `app/composables/query/`에는 Vue Query 기반 코드만 남긴다.

## 검증

- QueryClient 플러그인 등록과 SSR dehydration/hydration 흐름을 검증한다.
- `useGetQuery` 기본 비자동 실행, `enabled: true`, 반응형 `enabled`, 수동 `refetch()`를 검증한다.
- query 및 mutation 옵션 전달과 fetcher 비노출 타입 제약을 검증한다.
- Key Builder의 키 계층과 무효화 범위를 검증한다.
- 이전된 기존 API composable 테스트와 새 Vue Query 테스트를 분리해 실행한다.
- 변경 범위 lint, typecheck, 전체 test, build를 실행한다.
