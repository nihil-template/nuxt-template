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
