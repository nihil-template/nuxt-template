# Vue Query 공개 제네릭 축소 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 도메인 훅이 GET 응답 하나와 mutation 응답·body 두 개의 제네릭만 사용하도록 Vue Query 래퍼 계약을 단순화한다.

**Architecture:** Query Key, params, error, context는 입력 객체와 고정 기본값으로 처리한다. 공통 훅은 TanStack 타입 경계를 내부에 유지하고, 도메인 훅은 축소된 공용 시그니처만 호출한다.

**Tech Stack:** Nuxt 4, Vue 3, TypeScript, TanStack Vue Query 5, Vitest

**Spec:** `docs/superpowers/specs/2026-08-21-vue-query-public-generics-design.md`

## Global Constraints

- GET 공개 제네릭은 `TResponse` 하나다.
- mutation 공개 제네릭은 `TResponse`, `TBody` 두 개다.
- mutation 실행 값은 HTTP body이며, params는 훅 입력 객체에 둔다.
- 커밋은 마스터의 명시적 요청이 있을 때만 수행한다.

---

### Task 1: 축소된 공개 타입 계약을 검증한다

**Files:**
- Modify: `test/query-composables.test.ts`
- Modify: `app/types/api.types.ts`
- Modify: `app/types/query.types.ts`

- [x] GET 한 개와 mutation 두 개의 제네릭 호출, static params, 직접 body 전달을 검증하는 테스트를 작성하고 실패를 확인한다.
- [x] `ApiParams`, 입력 타입, option override 타입에서 공개 제네릭을 축소한다.
- [x] 대상 테스트를 실행해 통과를 확인한다.

### Task 2: 공통 Query와 mutation 훅을 단순화한다

**Files:**
- Modify: `app/composables/query/useGetQuery.ts`
- Modify: `app/composables/query/usePostMutation.ts`
- Modify: `app/composables/query/usePutMutation.ts`
- Modify: `app/composables/query/usePatchMutation.ts`
- Modify: `app/composables/query/useDeleteMutation.ts`

- [x] Task 1 테스트가 구현 전 실패하는지 확인한다.
- [x] 공개 제네릭을 축소하고, 기존 method·headers·fetch options·query client 동작을 보존한다.
- [x] query composable 테스트를 실행해 통과를 확인한다.

### Task 3: 사용자 도메인 훅과 안내 문서를 정리한다

**Files:**
- Modify: `app/composables/domain/user/useCreateUser.ts`
- Modify: `app/composables/domain/user/useDeleteUser.ts`
- Modify: `app/composables/domain/user/useGetUser.ts`
- Modify: `app/composables/domain/user/useGetUsers.ts`
- Modify: `app/composables/domain/user/usePatchUser.ts`
- Modify: `app/composables/domain/user/useUpdateUser.ts`
- Modify: `app/composables/query/README.md`

- [x] 모든 사용자 도메인 훅의 제네릭 수가 공개 계약을 따르는지 확인한다.
- [x] README 예시를 축소된 계약으로 갱신한다.
- [x] 대상 lint와 타입 검사를 실행하고, 기존 무관 오류는 분리해 보고한다.
