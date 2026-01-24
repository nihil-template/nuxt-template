# API 에러 처리 업데이트 플랜

## Goal
백엔드 API의 응답 설계에 맞게 프론트엔드 에러 처리 로직을 수정합니다. 모든 HTTP 응답이 200 상태 코드를 반환하며, 실제 에러 여부는 `ResponseType.error` 필드로 판단하고, 에러 타입은 `code` 필드로 구분하는 구조에 맞춥니다.

## Context
- **Date**: 2026-01-23
- **Original Command**: "플랜을 다시 한 번 짜보도록 해"
- **Background**: 
  - 백엔드 API는 모든 응답을 HTTP 200으로 반환
  - 에러 여부는 `ResponseType.error` (boolean) 필드로 판단
  - 에러 타입은 `ResponseType.code` (string) 필드로 구분
  - 에러 메시지는 `ResponseType.message` (string) 필드에 포함
  - 현재 코드와 문서가 이 설계를 반영하지 않음

## Strategy
1. **문서 업데이트**: `프론트-백-통신-구상.md`의 Axios interceptor 부분을 실제 API 설계에 맞게 수정
2. **Composable 개선**: `useGet`, `usePost`, `usePut`, `usePatch`, `useDelete`에서 `ResponseType.error` 필드를 확인하여 에러 처리
3. **에러 코드 타입 정의**: 공통 에러 코드를 타입으로 정의하여 타입 안정성 확보
4. **에러 처리 유틸리티**: 에러 코드에 따른 처리 로직을 공통 유틸리티로 분리

## Task List

### 1. 에러 코드 타입 정의
- [ ] `app/types/common.types.ts`에 에러 코드 타입 추가
- [ ] 에러 코드 상수 정의 (예: `AUTH_REQUIRED`, `PERMISSION_DENIED` 등)

### 2. 에러 처리 유틸리티 생성
- [ ] `app/utils/api-error-handler.ts` 생성
- [ ] `ResponseType`의 `error` 필드 확인 로직
- [ ] `code` 필드에 따른 처리 로직 (인증 실패, 권한 없음 등)
- [ ] 사용자 친화적 에러 메시지 반환

### 3. Composable 에러 처리 개선
- [ ] `app/composables/query/useGet.ts` 수정
  - `onResponse`에서 `ResponseType.error` 확인
  - 에러 시 `errorCallback` 호출 또는 예외 발생
- [ ] `app/composables/query/usePost.ts` 수정
  - 응답의 `error` 필드 확인
  - 에러 처리 로직 추가
- [ ] `app/composables/query/usePut.ts` 수정
- [ ] `app/composables/query/usePatch.ts` 수정
- [ ] `app/composables/query/useDelete.ts` 수정

### 4. 문서 업데이트
- [ ] `분석/프론트-백-통신-구상.md` 수정
  - Axios interceptor 섹션을 실제 API 설계에 맞게 수정
  - 모든 응답이 200이라는 점 명시
  - `ResponseType.error` 필드로 에러 판단하는 방식 설명
  - 에러 처리 전략 섹션 업데이트

### 5. 타입 안정성 개선
- [ ] `ResponseType`의 `code` 필드를 유니온 타입으로 제한 (선택사항)
- [ ] 에러 응답 타입 별도 정의 (선택사항)

## Files to Modify

### 신규 생성
- `app/utils/api-error-handler.ts` - 에러 처리 유틸리티

### 수정 대상
- `app/types/common.types.ts` - 에러 코드 타입 추가
- `app/composables/query/useGet.ts` - 에러 처리 로직 추가
- `app/composables/query/usePost.ts` - 에러 처리 로직 추가
- `app/composables/query/usePut.ts` - 에러 처리 로직 추가
- `app/composables/query/usePatch.ts` - 에러 처리 로직 추가
- `app/composables/query/useDelete.ts` - 에러 처리 로직 추가
- `분석/프론트-백-통신-구상.md` - 문서 업데이트

## Technical Details

### ResponseType 구조
```typescript
export interface ResponseType<TData = null> {
  error: boolean;        // 에러 여부 판단
  message: string;       // 사용자 친화적 메시지
  data: TData;          // 실제 데이터
  code: string;         // 에러 코드 (에러 타입 구분)
  responseTime: number;  // 응답 시간
}
```

### 에러 처리 흐름
1. API 응답 수신 (항상 HTTP 200)
2. `response.error` 필드 확인
3. `error === true`인 경우:
   - `response.code`로 에러 타입 판단
   - 적절한 처리 수행 (리다이렉트, 토스트 표시 등)
   - `errorCallback` 호출 또는 예외 발생
4. `error === false`인 경우:
   - `response.data` 반환
   - `callback` 호출

### 주요 에러 코드 (예상)
- `AUTH_REQUIRED`: 인증 필요 → 로그인 페이지로 리다이렉트
- `PERMISSION_DENIED`: 권한 없음 → 에러 메시지 표시
- `NOT_FOUND`: 리소스 없음 → 에러 메시지 표시
- `VALIDATION_ERROR`: 검증 실패 → 폼 에러 표시
- `SERVER_ERROR`: 서버 에러 → 에러 메시지 표시 + 로깅

## Verification
1. 각 composable에서 `error: true`인 응답을 받았을 때 적절히 처리되는지 확인
2. `error: false`인 응답은 정상적으로 `data`를 반환하는지 확인
3. 에러 코드에 따른 분기 처리가 올바르게 동작하는지 확인
4. 문서가 실제 구현과 일치하는지 확인
