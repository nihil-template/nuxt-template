# Nuxt 라우트 구조 정의 플랜

## Goal
Fantasy Builder 프로젝트의 Nuxt 라우트 구조를 정의합니다. API 엔드포인트 구조와 프로젝트 목표를 반영하여 직관적이고 확장 가능한 라우트 구조를 설계합니다.

## Context
- **Date**: 2026-01-23
- **Original Command**: "이제 nuxt 의 라우트들을 정해야 하는데 auth/signin auth/signup auth/reset-password 등은 고정이야."
- **Background**: 
  - Nuxt 4 파일 기반 라우팅 사용
  - API 엔드포인트 구조와 일치하는 라우트 설계 필요
  - 전역 풀(프로젝트 독립적)과 프로젝트 종속 리소스 구분
  - 인증 관련 라우트는 고정: `/auth/signin`, `/auth/signup`, `/auth/reset-password`

## Strategy
1. **인증 라우트**: 고정된 경로로 정의 (`/auth/*`), 로그인 성공 시 `/dashboard`로 리다이렉트
2. **랜딩 페이지**: 루트 경로(`/`)에 서비스 소개 페이지
3. **대시보드**: 로그인 후 이동하는 메인 페이지 (`/dashboard`)
4. **전역 풀 라우트**: 프로젝트 독립적 리소스 (`/traits`, `/skills`)
5. **프로젝트 라우트**: 프로젝트 관리 및 프로젝트 종속 리소스 (`/projects/*`)
6. **RESTful 패턴**: API 엔드포인트와 일치하는 구조

## Task List

### 1. 인증 라우트 (고정)
- [ ] `/auth/signin` - 로그인 페이지 (로그인 성공 시 `/dashboard`로 리다이렉트)
- [ ] `/auth/signup` - 회원가입 페이지
- [ ] `/auth/reset-password` - 비밀번호 재설정 페이지

### 2. 홈 및 대시보드
- [ ] `/` - 랜딩 페이지 (비로그인 사용자용, 서비스 소개)
- [ ] `/dashboard` - 대시보드 (로그인 후 이동, 프로젝트 목록 및 개요)

### 3. 전역 풀 라우트 (프로젝트 독립적)
- [ ] `/traits` - 전역 특성 목록
- [ ] `/traits/[traitNo]` - 전역 특성 상세
- [ ] `/traits/new` - 전역 특성 생성
- [ ] `/traits/[traitNo]/edit` - 전역 특성 수정
- [ ] `/skills` - 전역 스킬 목록
- [ ] `/skills/[skillNo]` - 전역 스킬 상세
- [ ] `/skills/new` - 전역 스킬 생성
- [ ] `/skills/[skillNo]/edit` - 전역 스킬 수정

### 4. 프로젝트 라우트
- [ ] `/projects` - 프로젝트 목록 (대시보드에서도 접근 가능)
- [ ] `/projects/new` - 프로젝트 생성
- [ ] `/projects/[prjNo]` - 프로젝트 상세/대시보드
- [ ] `/projects/[prjNo]/edit` - 프로젝트 수정

### 5. 프로젝트 종속 특성/스킬 라우트
- [ ] `/projects/[prjNo]/traits` - 프로젝트 종속 특성 목록
- [ ] `/projects/[prjNo]/traits/[traitNo]` - 프로젝트 종속 특성 상세
- [ ] `/projects/[prjNo]/traits/new` - 프로젝트 종속 특성 생성
- [ ] `/projects/[prjNo]/traits/[traitNo]/edit` - 프로젝트 종속 특성 수정
- [ ] `/projects/[prjNo]/skills` - 프로젝트 종속 스킬 목록
- [ ] `/projects/[prjNo]/skills/[skillNo]` - 프로젝트 종속 스킬 상세
- [ ] `/projects/[prjNo]/skills/new` - 프로젝트 종속 스킬 생성
- [ ] `/projects/[prjNo]/skills/[skillNo]/edit` - 프로젝트 종속 스킬 수정

### 6. 설정 엔티티 라우트 (프로젝트 종속)
각 엔티티별로 동일한 패턴:
- [ ] `/projects/[prjNo]/characters` - 인물 목록
- [ ] `/projects/[prjNo]/characters/[charNo]` - 인물 상세
- [ ] `/projects/[prjNo]/characters/new` - 인물 생성
- [ ] `/projects/[prjNo]/characters/[charNo]/edit` - 인물 수정
- [ ] `/projects/[prjNo]/creatures` - 종족 목록
- [ ] `/projects/[prjNo]/creatures/[creatureNo]` - 종족 상세
- [ ] `/projects/[prjNo]/creatures/new` - 종족 생성
- [ ] `/projects/[prjNo]/creatures/[creatureNo]/edit` - 종족 수정
- [ ] `/projects/[prjNo]/items` - 아이템 목록
- [ ] `/projects/[prjNo]/items/[itemNo]` - 아이템 상세
- [ ] `/projects/[prjNo]/items/new` - 아이템 생성
- [ ] `/projects/[prjNo]/items/[itemNo]/edit` - 아이템 수정
- [ ] `/projects/[prjNo]/regions` - 지역 목록
- [ ] `/projects/[prjNo]/regions/[regionNo]` - 지역 상세
- [ ] `/projects/[prjNo]/regions/new` - 지역 생성
- [ ] `/projects/[prjNo]/regions/[regionNo]/edit` - 지역 수정
- [ ] `/projects/[prjNo]/nations` - 국가 목록
- [ ] `/projects/[prjNo]/nations/[ntnNo]` - 국가 상세
- [ ] `/projects/[prjNo]/nations/new` - 국가 생성
- [ ] `/projects/[prjNo]/nations/[ntnNo]/edit` - 국가 수정
- [ ] `/projects/[prjNo]/organizations` - 조직 목록
- [ ] `/projects/[prjNo]/organizations/[orgNo]` - 조직 상세
- [ ] `/projects/[prjNo]/organizations/new` - 조직 생성
- [ ] `/projects/[prjNo]/organizations/[orgNo]/edit` - 조직 수정
- [ ] `/projects/[prjNo]/frameworks` - 세계관 구조 목록
- [ ] `/projects/[prjNo]/frameworks/[frmNo]` - 세계관 구조 상세
- [ ] `/projects/[prjNo]/frameworks/new` - 세계관 구조 생성
- [ ] `/projects/[prjNo]/frameworks/[frmNo]/edit` - 세계관 구조 수정
- [ ] `/projects/[prjNo]/events` - 사건 목록
- [ ] `/projects/[prjNo]/events/[eventNo]` - 사건 상세
- [ ] `/projects/[prjNo]/events/new` - 사건 생성
- [ ] `/projects/[prjNo]/events/[eventNo]/edit` - 사건 수정
- [ ] `/projects/[prjNo]/lores` - 전승/설화 목록
- [ ] `/projects/[prjNo]/lores/[loreNo]` - 전승/설화 상세
- [ ] `/projects/[prjNo]/lores/new` - 전승/설화 생성
- [ ] `/projects/[prjNo]/lores/[loreNo]/edit` - 전승/설화 수정

### 7. 문서화
- [ ] 라우트 구조를 문서로 정리
- [ ] 각 라우트의 목적과 사용 시나리오 설명

## Files to Create

### 인증 라우트
- `app/pages/auth/signin.vue`
- `app/pages/auth/signup.vue`
- `app/pages/auth/reset-password.vue`

### 전역 풀 라우트
- `app/pages/traits/index.vue` - 목록
- `app/pages/traits/[traitNo].vue` - 상세
- `app/pages/traits/new.vue` - 생성
- `app/pages/traits/[traitNo]/edit.vue` - 수정
- `app/pages/skills/index.vue` - 목록
- `app/pages/skills/[skillNo].vue` - 상세
- `app/pages/skills/new.vue` - 생성
- `app/pages/skills/[skillNo]/edit.vue` - 수정

### 홈 및 대시보드
- `app/pages/index.vue` - 랜딩 페이지
- `app/pages/dashboard.vue` - 대시보드 (로그인 후 이동)

### 프로젝트 라우트
- `app/pages/projects/index.vue` - 목록
- `app/pages/projects/new.vue` - 생성
- `app/pages/projects/[prjNo]/index.vue` - 상세/대시보드
- `app/pages/projects/[prjNo]/edit.vue` - 수정

### 프로젝트 종속 특성/스킬
- `app/pages/projects/[prjNo]/traits/index.vue`
- `app/pages/projects/[prjNo]/traits/[traitNo].vue`
- `app/pages/projects/[prjNo]/traits/new.vue`
- `app/pages/projects/[prjNo]/traits/[traitNo]/edit.vue`
- `app/pages/projects/[prjNo]/skills/index.vue`
- `app/pages/projects/[prjNo]/skills/[skillNo].vue`
- `app/pages/projects/[prjNo]/skills/new.vue`
- `app/pages/projects/[prjNo]/skills/[skillNo]/edit.vue`

### 설정 엔티티 (예시: 인물, 종족)
- `app/pages/projects/[prjNo]/characters/index.vue`
- `app/pages/projects/[prjNo]/characters/[charNo].vue`
- `app/pages/projects/[prjNo]/characters/new.vue`
- `app/pages/projects/[prjNo]/characters/[charNo]/edit.vue`
- `app/pages/projects/[prjNo]/creatures/index.vue`
- `app/pages/projects/[prjNo]/creatures/[creatureNo].vue`
- `app/pages/projects/[prjNo]/creatures/new.vue`
- `app/pages/projects/[prjNo]/creatures/[creatureNo]/edit.vue`
- (기타 엔티티도 동일한 패턴)

## Technical Details

### Nuxt 파일 기반 라우팅 규칙
- `index.vue`: 해당 경로의 기본 페이지
- `[param].vue`: 동적 라우트 파라미터
- `new.vue`: 생성 페이지
- `edit.vue`: 수정 페이지

### 라우트 구조 원칙
1. **RESTful 패턴**: 목록(`/index`), 상세(`/[id]`), 생성(`/new`), 수정(`/[id]/edit`)
2. **계층 구조**: 프로젝트 종속 리소스는 `/projects/[prjNo]/` 하위에 위치
3. **일관성**: 모든 엔티티가 동일한 패턴을 따름
4. **명확성**: URL만으로 리소스의 계층과 타입을 파악 가능

### 라우트 예시
```
/                                    # 랜딩 페이지 (비로그인 사용자용)
/dashboard                           # 대시보드 (로그인 후 이동)
/auth/signin                         # 로그인 (고정, 성공 시 /dashboard로 리다이렉트)
/auth/signup                         # 회원가입 (고정)
/auth/reset-password                 # 비밀번호 재설정 (고정)
/traits                              # 전역 특성 목록
/traits/123                          # 전역 특성 상세
/traits/new                          # 전역 특성 생성
/traits/123/edit                     # 전역 특성 수정
/skills                              # 전역 스킬 목록
/projects                            # 프로젝트 목록
/projects/456                        # 프로젝트 상세
/projects/456/traits                 # 프로젝트 종속 특성 목록
/projects/456/traits/789             # 프로젝트 종속 특성 상세
/projects/456/characters             # 인물 목록
/projects/456/characters/101         # 인물 상세
```

### 인증 플로우
1. 비로그인 사용자: `/` (랜딩 페이지) → `/auth/signin` (로그인)
2. 로그인 성공: `/auth/signin` → `/dashboard` (자동 리다이렉트)
3. 로그인된 사용자: `/dashboard`에서 프로젝트 목록 및 개요 확인

## Verification
1. 모든 라우트가 API 엔드포인트와 일치하는지 확인
2. 인증 라우트가 고정 경로로 정의되었는지 확인
3. 전역 풀과 프로젝트 종속 리소스가 명확히 구분되었는지 확인
4. 모든 엔티티가 일관된 패턴을 따르는지 확인
