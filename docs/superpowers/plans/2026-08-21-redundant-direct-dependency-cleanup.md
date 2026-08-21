# 중복 직접 의존성 정리 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Element Plus가 제공하는 중복 직접 의존성 선언을 제거한다.

**Architecture:** 애플리케이션의 직접 의존성 목록에서 중복 세 항목만 제거하고, pnpm이 lockfile importer를 현재 manifest에 맞춰 재생성한다. Element Plus가 소유하는 전이 의존성 해석은 보존한다.

**Tech Stack:** pnpm 11, Element Plus 2, Nuxt 4

**Spec:** `docs/superpowers/specs/2026-08-21-redundant-direct-dependency-cleanup-design.md`

## Global Constraints

- `argon2`와 `jose`는 유지한다.
- `@element-plus/icons-vue`, `dayjs`, `lodash-unified`만 직접 의존성에서 제거한다.
- 사용자 작업 트리의 기존 변경은 수정하거나 되돌리지 않는다.
- 커밋은 마스터가 별도로 요청할 때만 수행한다.

---

### Task 1: 직접 의존성 선언과 lockfile importer 정리

**Files:**

- Modify: `package.json`
- Modify: `pnpm-lock.yaml`

**Interfaces:**

- Consumes: Element Plus 2.14.4의 전이 의존성 선언
- Produces: 세 패키지 없이 해석되는 프로젝트 직접 의존성 목록

- [x] **Step 1: `package.json` dependencies에서 세 직접 선언을 제거한다.**

```json
{
  "dependencies": {
    "element-plus": "^2.14.4"
  }
}
```

- [x] **Step 2: lockfile importer를 오프라인으로 갱신한다.**

Run: `pnpm install --lockfile-only --offline --ignore-scripts`

Expected: 성공하고 세 항목이 importer dependencies에서 제거된다.

- [x] **Step 3: 직접 선언이 제거되었는지 확인한다.**

Run: `rg -n '"(@element-plus/icons-vue|dayjs|lodash-unified)"' package.json`

Expected: 종료 코드 1로 일치 항목이 없다.

- [x] **Step 4: 회귀 검증을 실행한다.**

Run: `pnpm test; pnpm exec vue-tsc --noEmit; pnpm build; git diff --check`

Expected: 테스트, 타입 검사, 빌드, diff 공백 검사가 성공한다.
