# D&D Master Tool 프로젝트 규칙

## 프로젝트 구조 규칙

### 1. 타입 정의
- 모든 TypeScript 타입은 /app/types/ 폴더에 정의한다.
- 타입 파일명은 [기능명].types.ts 형식을 따른다.
- 예: session-roll-table.types.ts, map.types.ts

### 2. 타입 임포트 규칙
- 모든 타입은 반드시 /app/types/ 폴더에서만 임포트한다.
- 재 익스포트 (re-export) 를 금지한다.
- 데이터 레이어와 컴포넌트는 직접 ~/types/[기능명].types.ts 를 임포트한다.

### 3. 앱 노출
- 모든 도구/앱은 /tools 라우트 아래에 노출된다.
- 예: /tools/session-roll-table, /tools/map

### 4. 컴포넌트 배치
- 기능별 컴포넌트는 /app/components/[기능명]/ 폴더에 배치한다.
- 예: /app/components/map/, /app/components/sessionRollTable/

### 5. 데이터 계층
- 정적 데이터와 설정은 /app/data/[기능명]/ 폴더에 배치한다.
- 예: /app/data/map/, /app/data/session-roll-table/

## 현재 구현된 도구

1. **세션 롤 테이블** - /tools/session-roll-table
2. **인터렉티브 맵** - /tools/map (개발 중)

## 개발 가이드

- 새 도구 추가 시 위 규칙을 따른다.
- 기존 코드와 일관된 패턴을 유지한다.

## 페이지 컴포넌트 규칙

### pages 내 Vue 파일은 렌더링 컴포넌트만 작성
- `/app/pages/` 내의 Vue 파일은 실제 렌더링 로직을 직접 작성하지 않는다.
- 대신 `/app/components/views/` 폴더의 렌더링 전용 컴포넌트를 임포트하여 사용한다.
- pages 파일에서는 `definePageMeta`, `useSetMeta` 등 메타데이터 설정만 수행한다.

예시:
```vue
<script setup lang="ts">
definePageMeta({
  layout: 'common',
});

useSetMeta({
  title: '홈',
  url: '/',
});
</script>

<template>
  <HomeView />
</template>
```
