# Prisma PostgreSQL 전환 설계

## 목적

템플릿의 Drizzle ORM 계층을 제거하고 Prisma 7과 PostgreSQL 기반의 서버 데이터베이스 계층으로 교체한다.

## 환경 계약

- `DATABASE_URL` 이름과 PostgreSQL URL 형식을 유지한다.
- 개발 실행은 `.env.dev`, 운영 실행은 `.env.prod`의 `DATABASE_URL`을 사용한다.
- `prisma.config.ts`는 `NODE_ENV === 'production'`일 때만 운영 파일을 선택하고, 그 외에는 개발 파일을 선택한다.
- `.env.example` 및 개발·운영 example 파일은 동일한 키를 유지한다.

## 구성

- `prisma/schema.prisma`는 PostgreSQL provider와 기존 `example_items` 테이블에 대응하는 `ExampleItem` 모델을 소유한다.
- `prisma.config.ts`는 schema 위치, migrations 경로, 선택된 환경 파일의 datasource URL을 설정한다.
- `server/db/client.ts`는 `PrismaPg` adapter와 `PrismaClient`를 사용하고, 개발 환경에서만 global singleton을 재사용한다.
- `nuxt.config.ts`에서 Drizzle Nitro auto-import preset을 제거한다.

## 제거 범위

- `drizzle.config.ts`
- `server/db/schema/`
- `drizzle-orm`, `drizzle-kit`, `postgres`
- Drizzle starter를 설명하는 현재 템플릿 문서 참조

## 검증과 비범위

- `prisma generate`, `prisma validate`, 변경 범위 lint와 타입 검사를 실행한다.
- 실제 DB 연결, migration 생성·적용, 기존 데이터 이전은 수행하지 않는다.
