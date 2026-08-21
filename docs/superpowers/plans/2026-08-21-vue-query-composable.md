# Vue Query Composable 전환 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 기존 HTTP composable을 보존해 이전하고, `app/composables/query/`에 수동 실행 기본값의 TanStack Vue Query 기반 훅과 Key Builder 문서를 제공한다.

**Architecture:** 기존 Nuxt `useFetch` 및 `$fetch` 계층은 `app/composables/api/`로 이동한다. 새 query 계층은 내부 fetcher, 메서드별 query/mutation 훅, QueryClient Nuxt 플러그인으로 구성한다. `app/keys/`는 도메인별 query key와 사용 규칙을 소유하며, 일반 GET은 `enabled: false`로 시작한다.

**Tech Stack:** Nuxt 4, Vue 3, TypeScript, @tanstack/vue-query 5, Vitest

**Spec:** `docs/superpowers/specs/2026-08-20-vue-query-composable-design.md`

## Global Constraints

- 기반 훅 이름은 `useGetQuery`, `usePostMutation`, `usePutMutation`, `usePatchMutation`, `useDeleteMutation`으로 고정한다.
- `useGetQuery`는 `queryOptions.enabled`가 없으면 `false`를 사용하며 `refetch()` 수동 실행을 지원한다.
- `queryOptions`에서는 `queryKey`, `queryFn`을, `mutationOptions`에서는 `mutationFn`을 받지 않는다.
- 모든 Vue Query custom hook은 `$fetch` 기반 fetcher를 내부에 둔다.
- query key는 `app/keys/`의 도메인별 Builder가 생성하며 호출부에서 배열을 직접 작성하지 않는다.
- SSR dehydration/hydration 기반은 플러그인에 제공하되, 일반 GET의 server prefetch는 기본으로 수행하지 않는다.
- 함수 선언과 호출에서 인자가 둘 이상이면 각 인자를 줄바꿈하고 스페이스 2칸으로 들여쓴다.
- 커밋은 마스터가 명시적으로 요청할 때만 수행한다.

---

## 파일 구조

```text
app/
├─ composables/
│  ├─ api/
│  │  ├─ createMutation.ts
│  │  ├─ index.ts
│  │  ├─ shared.ts
│  │  ├─ types.ts
│  │  ├─ useDelete.ts
│  │  ├─ useGet.ts
│  │  ├─ usePatch.ts
│  │  ├─ usePost.ts
│  │  └─ usePut.ts
│  └─ query/
│     ├─ fetcher.ts
│     ├─ types.ts
│     ├─ useDeleteMutation.ts
│     ├─ useGetQuery.ts
│     ├─ usePatchMutation.ts
│     ├─ usePostMutation.ts
│     └─ usePutMutation.ts
├─ keys/
│  ├─ README.md
│  └─ example.query-keys.ts
└─ plugins/
   └─ vue-query.ts
test/
├─ api-composables.test.ts
├─ api-shared.test.ts
├─ query-composables.test.ts
├─ query-keys.test.ts
└─ vue-query-plugin.test.ts
```

### Task 1: 기존 HTTP composable을 API 계층으로 이전

**Files:**
- Create: `app/composables/api/createMutation.ts`
- Create: `app/composables/api/index.ts`
- Create: `app/composables/api/shared.ts`
- Create: `app/composables/api/types.ts`
- Create: `app/composables/api/useDelete.ts`
- Create: `app/composables/api/useGet.ts`
- Create: `app/composables/api/usePatch.ts`
- Create: `app/composables/api/usePost.ts`
- Create: `app/composables/api/usePut.ts`
- Create: `test/api-composables.test.ts`
- Create: `test/api-shared.test.ts`
- Delete: `test/query-composables.test.ts`
- Delete: `test/query-shared.test.ts`
- Delete: `app/composables/query/createMutation.ts`
- Delete: `app/composables/query/index.ts`
- Delete: `app/composables/query/shared.ts`
- Delete: `app/composables/query/types.ts`
- Delete: `app/composables/query/useDelete.ts`
- Delete: `app/composables/query/useGet.ts`
- Delete: `app/composables/query/usePatch.ts`
- Delete: `app/composables/query/usePost.ts`
- Delete: `app/composables/query/usePut.ts`

**Consumes:** 현행 Nuxt `useFetch` 및 `$fetch` 요청 계약.

**Produces:** `app/composables/api`에서 export되는 기존 `useGet`, `usePost`, `usePut`, `usePatch`, `useDelete`와 관련 타입.

- [ ] **Step 1: 기존 테스트 import를 API 경로로 바꾸고 테스트 파일명을 변경한다.**

```ts
import {
  useDelete,
  useGet,
  usePost,
} from '../app/composables/api';
import type { QueryFetchOptions } from '../app/composables/api';
```

- [ ] **Step 2: 이전 전 테스트가 실패하는지 확인한다.**

Run: `pnpm test -- test/query-composables.test.ts test/query-shared.test.ts`

Expected: FAIL because `app/composables/api` does not exist yet.

- [ ] **Step 3: 기존 query 구현 파일을 내용 변경 없이 `app/composables/api/`로 이동하고 상대 import만 새 경로에 맞춘다.**

```ts
export * from './types';
export * from './shared';
export * from './createMutation';
export * from './useDelete';
export * from './useGet';
export * from './usePatch';
export * from './usePost';
export * from './usePut';
```

- [ ] **Step 4: API 계층 테스트가 통과하는지 확인한다.**

Run: `pnpm test -- test/api-composables.test.ts test/api-shared.test.ts`

Expected: PASS; 기존 GET 수동 실행, params/body, header 병합, reset 동작이 보존된다.

### Task 2: Vue Query 플러그인과 공통 타입·fetcher를 만든다

**Files:**
- Create: `app/plugins/vue-query.ts`
- Create: `app/composables/query/types.ts`
- Create: `app/composables/query/fetcher.ts`
- Create: `test/vue-query-plugin.test.ts`

**Consumes:** `@tanstack/vue-query`의 `QueryClient`, `VueQueryPlugin`, `dehydrate`, `hydrate` API.

**Produces:** SSR cache 전송이 가능한 QueryClient 등록과 `QueryRequest`, `MutationVariables`, 제한된 option 타입, `$fetch` 호출 helper.

- [ ] **Step 1: 플러그인 및 fetcher의 기대 동작을 검증하는 실패 테스트를 작성한다.**

```ts
it('registers one QueryClient and hydrates the transferred query state', () => {
  expect(mockVueApp.use).toHaveBeenCalledWith(
    VueQueryPlugin,
    expect.objectContaining({ queryClient: expect.any(QueryClient) }),
  );
});

it('sends request params and body through the internal fetcher', async () => {
  await requestApi({
    body: { title: '새 문서' },
    method: 'POST',
    params: { projectId: 'project-1' },
    url: '/api/documents',
  });
});
```

- [ ] **Step 2: 테스트가 실패하는지 확인한다.**

Run: `pnpm test -- test/vue-query-plugin.test.ts`

Expected: FAIL because the plugin and fetcher modules do not exist.

- [ ] **Step 3: QueryClient를 Nuxt 앱에 등록하고 서버 dehydrate·클라이언트 hydrate를 처리한다. `useState<DehydratedState | null>('vue-query')`로 전달 상태를 보관한다.**

```ts
if (import.meta.server) {
  nuxtApp.hooks.hook('app:rendered', () => {
    vueQueryState.value = dehydrate(queryClient);
  });
}

if (import.meta.client && vueQueryState.value) {
  hydrate(
    queryClient,
    vueQueryState.value,
  );
}
```

- [ ] **Step 4: `requestApi`가 method, URL, params, body, headers, fetchOptions를 받되 `$fetch`를 외부에 노출하지 않도록 작성한다.**

```ts
export function requestApi<TResponse>(
  request: QueryRequest,
): Promise<TResponse> {
  return $fetch<TResponse>(request.url, {
    body: request.body,
    headers: request.headers,
    method: request.method,
    query: request.params,
    ...request.fetchOptions,
  });
}
```

- [ ] **Step 5: 플러그인 및 fetcher 테스트를 통과시킨다.**

Run: `pnpm test -- test/vue-query-plugin.test.ts`

Expected: PASS.

### Task 3: 수동 GET 기반 훅을 구현한다

**Files:**
- Create: `app/composables/query/useGetQuery.ts`
- Create: `test/query-composables.test.ts`

**Consumes:** Task 2의 `requestApi`, 제한된 `GetQueryOptions`, QueryClient 플러그인.

**Produces:** `useGetQuery<TResponse, TParams>()`.

- [ ] **Step 1: 기본 수동 실행, enabled 전달, fetcher 내포를 검증하는 실패 테스트를 작성한다.**

```ts
const query = useGetQuery<{ id: string }>({
  queryKey: exampleQueryKeys.detail('item-1'),
  url: '/api/items/item-1',
});

expect(query.fetchStatus.value).toBe('idle');
await query.refetch();
expect(mockFetch).toHaveBeenCalledWith(
  '/api/items/item-1',
  expect.objectContaining({ method: 'GET' }),
);

const ssrQuery = useGetQuery<{ id: string }>({
  queryKey: exampleQueryKeys.detail('item-2'),
  queryOptions: {
    enabled: true,
  },
  ssr: true,
  url: '/api/items/item-2',
});

expect(mockOnServerPrefetch).toHaveBeenCalledOnce();
```

- [ ] **Step 2: 실패를 확인한다.**

Run: `pnpm test -- test/query-composables.test.ts`

Expected: FAIL because `useGetQuery` does not exist.

- [ ] **Step 3: `queryOptions`에서 `queryKey`, `queryFn`을 제외한 타입을 정의하고, `enabled ?? false`와 내부 queryFn을 함께 `useQuery`에 전달한다. 입력의 `ssr?: boolean`이 `true`이고 enabled가 `false`가 아닐 때만 `onServerPrefetch(() => query.suspense())`를 등록한다.**

```ts
const query = useQuery({
  ...input.queryOptions,
  enabled: input.queryOptions?.enabled ?? false,
  queryFn: async () => await requestApi<TResponse>({
    fetchOptions: input.fetchOptions,
    headers: input.headers,
    method: 'GET',
    params: input.params,
    url: input.url,
  }),
  queryKey: input.queryKey,
});

if (input.ssr && input.queryOptions?.enabled !== false) {
  onServerPrefetch(async () => {
    await query.suspense();
  });
}

return query;
```

- [ ] **Step 4: `enabled: true`, 반응형 enabled, `staleTime`, `select`, `refetch()`, 그리고 `ssr: true`의 명시적 prefetch 등록을 추가로 검증한다.**

Run: `pnpm test -- test/query-composables.test.ts`

Expected: PASS.

### Task 4: 메서드별 mutation 훅을 구현한다

**Files:**
- Create: `app/composables/query/usePostMutation.ts`
- Create: `app/composables/query/usePutMutation.ts`
- Create: `app/composables/query/usePatchMutation.ts`
- Create: `app/composables/query/useDeleteMutation.ts`
- Modify: `app/composables/query/types.ts`
- Modify: `test/query-composables.test.ts`

**Consumes:** Task 2의 `requestApi`와 `MutationVariables`.

**Produces:** HTTP method별 `use*Mutation<TResponse, TBody, TParams>()` 훅.

- [ ] **Step 1: POST와 DELETE mutation의 variables 전달 및 `onSuccess` 옵션 전달을 검증하는 실패 테스트를 작성한다.**

```ts
await useDeleteMutation<void>({
  mutationOptions: {
    onSuccess,
  },
  url: '/api/items',
}).mutateAsync({
  body: {
    ids: [ 'item-1', 'item-2' ],
  },
  params: {
    projectId: 'project-1',
  },
});
```

- [ ] **Step 2: 실패를 확인한다.**

Run: `pnpm test -- test/query-composables.test.ts`

Expected: FAIL because mutation hooks do not exist.

- [ ] **Step 3: 공통 `createMutation` helper를 `fetcher.ts`에 추가하고, 각 public hook은 HTTP method만 고정한다. `mutationOptions`에서는 `mutationFn`을 타입에서 제외한다.**

```ts
export function usePostMutation<TResponse>(
  input: MutationInput<TResponse>,
) {
  return createMutation<TResponse>(
    'POST',
    input,
  );
}
```

- [ ] **Step 4: POST, PUT, PATCH, DELETE의 params/body와 `mutationOptions.onSuccess` 전달을 검증한다.**

Run: `pnpm test -- test/query-composables.test.ts`

Expected: PASS.

### Task 5: Key Builder 예시와 사용 문서를 추가한다

**Files:**
- Create: `app/keys/example.query-keys.ts`
- Create: `app/keys/README.md`
- Create: `test/query-keys.test.ts`

**Consumes:** Task 3의 `useGetQuery`, Task 4의 mutation 훅.

**Produces:** 문서화된 Key Builder 계층과 무효화 예시.

- [ ] **Step 1: example key의 범위 관계를 검증하는 실패 테스트를 작성한다.**

```ts
expect(exampleQueryKeys.all()).toEqual([ 'examples' ]);
expect(exampleQueryKeys.lists()).toEqual([ 'examples', 'list' ]);
expect(exampleQueryKeys.detail('item-1')).toEqual([
  'examples',
  'detail',
  'item-1',
]);
```

- [ ] **Step 2: 실패를 확인한다.**

Run: `pnpm test -- test/query-keys.test.ts`

Expected: FAIL because the builder module does not exist.

- [ ] **Step 3: `all`, `lists`, `list(params)`, `detail(id)` 계층의 `exampleQueryKeys`를 작성한다.**

```ts
export const exampleQueryKeys = {
  all: () => [ 'examples' ] as const,
  lists: () => [ ...exampleQueryKeys.all(), 'list' ] as const,
  list: (
    params: ExampleListParams,
  ) => [ ...exampleQueryKeys.lists(), params ] as const,
  detail: (
    exampleId: string,
  ) => [ ...exampleQueryKeys.all(), 'detail', exampleId ] as const,
};
```

- [ ] **Step 4: `README.md`에 파일명, key 계층, 도메인 훅 사용, `invalidateQueries` 목록/상세 범위, 직렬화 가능 params 규칙을 코드 예시와 함께 작성한다.**

```ts
queryClient.invalidateQueries({
  queryKey: exampleQueryKeys.lists(),
});
```

- [ ] **Step 5: Key Builder 테스트를 통과시킨다.**

Run: `pnpm test -- test/query-keys.test.ts`

Expected: PASS.

### Task 6: 전체 계약을 검증하고 문서·자동 import를 확인한다

**Files:**
- Modify: `docs/superpowers/specs/2026-08-20-vue-query-composable-design.md` (검증 결과만 필요한 경우)
- Modify: 자동 생성 Nuxt 타입 파일 (생성 명령 결과에 한함)

**Consumes:** Tasks 1-5의 API 계층, Vue Query 계층, 플러그인, Key Builder.

**Produces:** 생성 import와 전체 품질 검증이 완료된 템플릿.

- [ ] **Step 1: Nuxt 자동 import 생성 결과를 갱신한다.**

Run: `pnpm exec nuxi prepare`

Expected: PASS; `app/composables/api`와 `app/composables/query`의 이름 충돌이 없어야 한다.

- [ ] **Step 2: 변경된 테스트 전체를 실행한다.**

Run: `pnpm test`

Expected: PASS.

- [ ] **Step 3: lint와 타입 검사를 실행한다.**

Run: `pnpm lint`

Expected: PASS.

Run: `pnpm exec vue-tsc --noEmit`

Expected: PASS.

- [ ] **Step 4: Nuxt production build를 실행한다.**

Run: `pnpm build`

Expected: PASS.

- [ ] **Step 5: 변경 범위와 미검증 항목을 검토한 뒤 마스터에게 보고한다.**

```text
보고에는 이전된 API 경로, 새 Vue Query 훅, Key Builder 문서 경로,
실행한 검증 명령과 결과, 커밋 미수행 여부를 포함한다.
```

## 자체 점검

- Spec coverage: Tasks 1-6이 API 이전, 기반 훅, 옵션 제한, Key Builder 및 README, SSR hydration, 검증을 각각 다룬다.
- Placeholder scan: 미결 구현 지시나 비어 있는 작업 단계 없음.
- Type consistency: 기반 요청 타입은 `QueryRequest`, mutation variables는 `MutationVariables`, key 예시는 `exampleQueryKeys`로 전 task에서 동일하게 사용한다.
