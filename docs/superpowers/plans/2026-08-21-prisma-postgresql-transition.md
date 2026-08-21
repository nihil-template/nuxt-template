# Prisma PostgreSQL 전환 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Drizzle starter를 제거하고 개발·운영 환경 파일을 구분하는 Prisma 7 PostgreSQL starter를 제공한다.

**Architecture:** Prisma config가 `NODE_ENV`에 따라 `.env.dev` 또는 `.env.prod`를 읽는다. 서버 client는 PrismaPg adapter를 주입한 PrismaClient singleton을 반환하며, Prisma schema가 starter 모델을 소유한다.

**Tech Stack:** Nuxt 4, TypeScript, Prisma 7, @prisma/adapter-pg, PostgreSQL

**Spec:** `docs/superpowers/specs/2026-08-21-prisma-postgresql-transition-design.md`

## Global Constraints

- `DATABASE_URL` 환경변수 이름과 PostgreSQL provider를 유지한다.
- DB migration을 생성하거나 실제 DB에 적용하지 않는다.
- Drizzle 런타임·설정·의존성은 모두 제거한다.
- 커밋은 마스터가 명시적으로 요청할 때만 수행한다.

---

### Task 1: Prisma PostgreSQL 의존성과 schema를 만든다

**Files:**
- Create: `prisma/schema.prisma`
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Delete: `drizzle.config.ts`
- Delete: `server/db/schema/index.ts`

- [x] `@prisma/adapter-pg`를 runtime dependency로 설치한다.
- [x] `ExampleItem` 모델과 PostgreSQL provider를 schema에 작성한다.
- [x] `prisma generate`와 `prisma validate`로 생성·schema 검증을 실행한다.

### Task 2: 환경별 Prisma config와 서버 client를 연결한다

**Files:**
- Create: `prisma.config.ts`
- Modify: `server/db/client.ts`
- Modify: `nuxt.config.ts`

- [x] `NODE_ENV` 기반 env 파일 선택과 datasource URL 설정을 작성한다.
- [x] PrismaPg adapter와 개발 환경 singleton PrismaClient를 작성한다.
- [x] Drizzle Nitro import preset을 제거한다.

### Task 3: Drizzle 의존성과 문서 참조를 제거하고 검증한다

**Files:**
- Modify: `package.json`
- Modify: `README.md`
- Modify: `docs/superpowers/plans/2026-06-30-nuxt-template-bootstrap.md`
- Delete: `server/db/schema/`

- [x] `drizzle-orm`, `drizzle-kit`, `postgres`를 제거한다.
- [x] 현재 starter 문서의 Drizzle 설명을 Prisma로 정정한다.
- [x] 대상 lint·typecheck와 `git diff --check`를 실행한다.
