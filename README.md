# Character Prompt Agent

AI 이미지 생성용 프롬프트를 작성하고, 참조 문서와 생성된 프롬프트를 함께 관리하는 Nuxt 기반 프로젝트.

## 목적

이 프로젝트의 핵심 목적은 AI가 사용할 이미지 생성 프롬프트를 더 정확하고 일관되게 작성하는 것이다.

이를 위해 시스템 프롬프트나 참조 자료로 사용할 문서를 관리하고, AI 대화를 통해 생성한 이미지 프롬프트를 저장, 분류, 재사용할 수 있어야 한다.

## 핵심 기능 체크리스트

### 1. 문서 관리

시스템 프롬프트, 작성 규칙, 캐릭터 설정, 스타일 가이드, 참고 문서 등을 관리한다.

현재 관리 대상 후보는 `md-docs` 폴더 안의 Markdown 파일들이다.

이 파일들은 단순 문서라기보다 `system_id`, `system_type`, `dependencies`, `load_order` 같은 메타데이터와 구조화된 항목을 가진 프롬프트 시스템 원본에 가깝다.

- [x] `docs` 테이블 설계
- [ ] 문서 제목 저장
- [ ] 문서 본문 저장
- [ ] 문서 타입 구분
- [ ] 시스템 ID 저장
- [ ] 진입점 여부 저장
- [ ] 항상 로드 여부 저장
- [ ] 로드 순서 저장
- [ ] 의존 문서 목록 저장
- [ ] 버전 저장
- [ ] 문서 태그 관리
- [ ] 문서 목록 조회
- [ ] 문서 상세 조회
- [ ] 문서 생성
- [ ] 문서 수정
- [ ] 문서 삭제
- [ ] AI가 참조할 문서 선택 기능
- [x] `md-docs` 문서를 AI 대화 컨텍스트에 포함하는 기능
- [x] `md-docs` 폴더의 Markdown 파일을 읽어오는 기능
- [x] Markdown frontmatter 파싱
- [ ] 문서 의존성 기준으로 참조 문서 자동 로드
- [ ] `always_load` 문서 자동 포함
- [x] `load_order` 기준 문서 정렬

#### 검토할 방식

- [ ] DB의 `docs` 테이블에 문서 내용을 직접 저장
- [ ] 실제 `.md` 파일을 특정 폴더 아래에 저장하고 DB에는 메타데이터만 저장
- [ ] DB 저장 방식과 파일 저장 방식을 함께 사용할지 검토
- [ ] DB의 구조화 데이터를 원본으로 삼고 Markdown 파일을 생성하는 방식 검토

기본 방향은 `docs` 테이블을 중심으로 관리한다.

다만 현재 `md-docs` 파일들은 프롬프트 시스템 원본으로 이미 잘 정리되어 있으므로 초기 단계에서는 파일을 직접 읽어 참조하고, 이후에는 DB에서 구조화 데이터를 관리한 뒤 최종 Markdown을 생성하는 방향을 우선 검토한다.

권장 방향:

- 초기 구현: `md-docs` 파일을 읽고 frontmatter를 파싱해서 AI 컨텍스트로 사용
- 중간 단계: `docs` 테이블에 문서 메타데이터와 본문을 동기화
- 최종 방향: 테마, 종족, 클래스, 프리셋 같은 라이브러리 항목은 DB에서 구조화 관리하고 Markdown은 산출물로 생성
- 최종 구조: `themes`, `races`, `classes`, `presets`는 각각 독립 테이블로 관리하고, 각 테이블의 데이터를 문서로 렌더링

### 2. 이미지 생성 프롬프트 관리

AI 대화를 통해 생성된 이미지 생성용 프롬프트를 저장하고 재사용할 수 있게 관리한다.

- [x] `prompts` 테이블 설계
- [ ] 프롬프트 이름 저장
- [ ] 프롬프트 본문 저장
- [ ] 태그 저장
- [ ] 참조한 문서 정보 저장
- [ ] 프롬프트 목록 조회
- [ ] 프롬프트 상세 조회
- [ ] 프롬프트 생성
- [ ] 프롬프트 수정
- [ ] 프롬프트 삭제
- [ ] 태그 기준 필터링
- [ ] 이름 또는 본문 검색
- [ ] 프롬프트 복사 기능

### 3. AI 대화 기능

문서를 정확히 읽고, 그 내용을 바탕으로 이미지 생성용 프롬프트를 작성하는 대화 기능을 제공한다.

현재 패키지에는 Vercel AI SDK 계열인 `ai`와 `@ai-sdk/openai`가 설치되어 있다. OpenAI 모델 호출은 AI SDK를 통해 처리한다.

사용 예정 모델:

- `gpt-4o-mini`

- [x] AI 대화 UI 구성
- [x] 최신 AI 어시스트 플랫폼 스타일의 채팅 화면 디자인
- [x] 좌측 채팅방 목록 패널 구성
- [ ] 새 채팅방 생성
- [ ] 채팅방 선택
- [ ] 채팅방 이름 수정
- [ ] 채팅방 삭제 또는 보관
- [x] 현재 채팅방의 메시지 목록 표시
- [x] 사용자 메시지 입력
- [x] Enter 입력 시 메시지 전송
- [x] Shift + Enter 입력 시 줄바꿈
- [x] 빈 메시지 전송 방지
- [x] AI 응답 출력
- [x] AI 응답 로딩 상태 표시
- [x] AI 응답 실패 상태 표시
- [x] 사용자 메시지와 AI 메시지를 명확히 구분
- [ ] 긴 프롬프트와 코드 블록을 읽기 좋게 표시
- [x] AI SDK 기반 서버 API 작성
- [x] `@ai-sdk/openai` 기반 `gpt-4o-mini` 모델 연결
- [ ] 참조 문서 선택
- [x] `md-docs` 문서를 시스템 프롬프트 또는 컨텍스트로 전달
- [x] `md-docs` 문서를 읽어 AI 컨텍스트로 조립
- [ ] `always_load` 문서를 기본 시스템 컨텍스트에 포함
- [ ] 선택한 문서의 `dependencies`를 함께 포함
- [x] `load_order` 기준으로 최종 컨텍스트 정렬
- [x] 이미지 생성용 프롬프트 작성 요청
- [ ] 생성된 프롬프트를 `prompts` 테이블에 저장
- [x] 대화 기록 저장 방식 검토
- [ ] 채팅방 단위로 대화 로그 저장
- [ ] 메시지 단위로 user / assistant 역할 저장
- [ ] AI 응답에 사용된 모델명 저장
- [ ] AI 응답 토큰 사용량 저장 여부 검토
- [ ] 생성된 프롬프트와 원본 채팅 메시지 연결 여부 검토
- [ ] 대화 중 생성된 후보 프롬프트 관리 방식 검토

#### 다음 채팅 기능 작업

- [ ] `chatRooms` 테이블 생성
- [ ] `chatMessages` 테이블 생성
- [ ] 채팅방 목록 조회 API 작성
- [ ] 새 채팅 클릭 시 새 채팅방 생성 API 호출
- [ ] 좌측 채팅방 클릭 시 해당 채팅방의 메시지 로그 조회
- [ ] 선택한 채팅방의 메시지 로그를 중앙 타임라인에 렌더링
- [ ] 사용자 메시지 전송 시 `chatMessages`에 user 메시지 저장
- [ ] AI 응답 완료 시 `chatMessages`에 assistant 메시지 저장
- [ ] 채팅방의 `lastMessage`, `lastMessageDate` 갱신
- [ ] 채팅방에서 최초 사용자 메시지가 생성되면 해당 화두를 바탕으로 채팅방 이름 자동 변경
- [ ] 자동 생성된 채팅방 이름은 너무 길지 않게 요약하거나 잘라서 저장
- [ ] 좌측 채팅방 항목에 마우스를 올리면 휴지통 아이콘 표시
- [ ] 휴지통 클릭 시 채팅방을 삭제 처리하거나 목록에서 제거
- [ ] 삭제는 실제 삭제보다 `deleteYn = 'Y'` 기반 소프트 삭제를 우선 검토
- [ ] 삭제된 채팅방의 메시지 로그 표시 방지

#### 채팅 UX 방향

채팅 화면은 단순 폼이 아니라 실제 AI 어시스트 플랫폼처럼 사용한다.

- 좌측에는 채팅방 목록을 둔다.
- 중앙에는 현재 채팅방의 메시지 타임라인을 둔다.
- 하단에는 고정된 메시지 입력창을 둔다.
- Enter는 전송, Shift + Enter는 줄바꿈으로 처리한다.
- 응답 생성 중에는 입력과 전송 버튼의 상태를 명확히 보여준다.
- 이미지 생성 프롬프트 결과는 일반 답변보다 복사, 저장, 태그 입력으로 이어지기 쉽게 보여준다.

#### 대화 로그 저장 검토

AI 대화 기능이 핵심이므로 채팅 로그 저장은 필요할 가능성이 높다.

검토할 방향:

- 채팅방 테이블과 메시지 테이블을 분리한다.
- 채팅방은 대화의 주제, 참조 문서, 생성된 프롬프트 후보를 묶는 단위로 본다.
- 메시지는 user / assistant 역할, 본문, 모델명, 토큰 사용량, 에러 상태 등을 저장한다.
- 프롬프트로 저장된 결과는 `prompts` 테이블에 저장하되, 어떤 채팅방과 메시지에서 만들어졌는지 추적할 수 있게 한다.
- 전체 로그를 영구 저장할지, 프롬프트로 저장한 대화만 보존할지 정책을 정한다.

#### 기본 시스템 프롬프트 정책

AI 대화 API는 기본 시스템 프롬프트에 다음 정책을 항상 포함한다.

[금지사항]

- 당신은 이미지를 직접 생성하는 주체가 아니다. 이미지를 생성하기 위한 텍스트(프롬프트)를 설계하는 텍스트 및 프롬프트 엔지니어링 전문가다.
- 결과물(이미지) 내에 그 어떤 형태의 텍스트(글자, 워터마크, 서명, 말풍선, UI 등)도 포함되어서는 안 된다.
- 주체(캐릭터) 외에 배경에 의도하지 않은 얼굴이나 다른 인물이 생성되지 않도록 철저히 통제해야 한다.

[프로젝트 정체성]

- “TRPG 포트레이트 생성” 프로젝트 전용 통합 판타지 프롬프트 설계 시스템으로 행동한다.
- 단순한 랜덤 키워드 나열기가 아니라 판타지 아트 디렉터, 시네마틱 캐릭터 설계 엔진, 절차형 판타지 archetype 생성 시스템, D&D 기반 비주얼 설계 전문가, 렌더링 안정화 및 silhouette 관리 시스템으로 행동한다.
- 고품질 TRPG 캐릭터 포트레이트 프롬프트, cinematic fantasy illustration 텍스트, D&D 및 판타지 archetype 유지, 얼굴 품질 및 눈 디테일 안정화, silhouette readability, 무기/포즈/전투 정체성, visual hierarchy, z-image-turbo 최적화 Prompt 생성을 목표로 한다.
- 항상 visually readable, cinematic, archetype recognizable, silhouette readable, professionally art directed 한 결과물을 목표로 한다.
- 랜덤 키워드 생성기처럼 행동하지 않고, 의미 없이 과도한 디테일을 추가하지 않으며, silhouette readability를 해치지 않고, 얼굴 품질보다 FX를 우선하지 않는다.
- 얼굴은 항상 최우선 focal point, silhouette는 archetype 정체성, 무기는 combat identity로 취급한다.
- 모든 판단은 visual clarity, rendering stability, cinematic composition, archetype consistency를 우선한다.
- 모든 사용자 상호작용은 한국어로 진행한다.
- 최종 이미지 생성용 Prompt만 영어 코드블럭으로 출력한다.
- 작업 수행 시 반드시 `TRPG 이미지 생성 마스터 프롬프트.md`를 최상위 진입점(root system)으로 삼아 시스템 규칙을 참조한다.

## 데이터베이스 계획

DB는 Neon PostgreSQL을 사용하고, Drizzle ORM으로 스키마와 마이그레이션을 관리한다.

테이블 정의 파일은 `app/server/table` 폴더 아래에 둔다.

### 공통 컬럼

모든 주요 관리 테이블은 다음 공통 컬럼을 가진다.

- [ ] `id`: 숫자 ID
- [ ] `useYn`: 사용 여부
- [ ] `deleteYn`: 삭제 여부
- [ ] `createId`: 생성자 ID
- [ ] `createDate`: 생성 일시
- [ ] `updateId`: 수정자 ID
- [ ] `updateDate`: 수정 일시
- [ ] `deleteId`: 삭제자 ID
- [ ] `deleteDate`: 삭제 일시

### docs 테이블 후보

- [ ] `id`
- [ ] 공통 컬럼
- [ ] `systemId`
- [ ] `title`
- [ ] `content`
- [ ] `type`
- [ ] `entryPoint`
- [ ] `alwaysLoad`
- [ ] `loadOrder`
- [ ] `dependencies`
- [ ] `tags`
- [ ] `version`
- [ ] `sourcePath`

### prompts 테이블 후보

- [ ] `id`
- [ ] 공통 컬럼
- [ ] `chatRoomId`
- [ ] `sourceMessageId`
- [ ] `name`
- [ ] `content`
- [ ] `tags`
- [ ] `docIds`

### chatRooms 테이블 후보

AI 대화의 채팅방 단위를 관리한다.

- [ ] `id`
- [ ] 공통 컬럼
- [ ] `title`
- [ ] `titleGeneratedYn`
- [ ] `summary`
- [ ] `model`
- [ ] `selectedDocIds`
- [ ] `selectedThemeIds`
- [ ] `selectedRaceIds`
- [ ] `selectedClassIds`
- [ ] `selectedPresetIds`
- [ ] `lastMessage`
- [ ] `lastMessageDate`
- [ ] `messageCount`
- [ ] `metadata`

### chatMessages 테이블 후보

채팅방 안의 개별 메시지 로그를 관리한다.

- [ ] `id`
- [ ] 공통 컬럼
- [ ] `chatRoomId`
- [ ] `sequence`
- [ ] `role`
- [ ] `content`
- [ ] `model`
- [ ] `promptTokens`
- [ ] `completionTokens`
- [ ] `totalTokens`
- [ ] `errorYn`
- [ ] `errorMessage`
- [ ] `metadata`

### themes 테이블 후보

테마 라이브러리의 개별 테마를 구조화해서 관리하고, 필요할 때 테마 문서로 렌더링한다.

- [ ] `id`
- [ ] 공통 컬럼
- [ ] `code`
- [ ] `name`
- [ ] `description`
- [ ] `tier`
- [ ] `coreIdentity`
- [ ] `primaryColors`
- [ ] `accentColors`
- [ ] `fxElements`
- [ ] `lightingStyle`
- [ ] `materialLanguage`
- [ ] `shapeLanguage`
- [ ] `atmosphere`
- [ ] `environmentalInfluence`
- [ ] `renderingKeywords`
- [ ] `sortOrder`
- [ ] `content`
- [ ] `metadata`

### races 테이블 후보

종족 표현 라이브러리의 개별 종족 또는 종족 표현 단위를 구조화해서 관리하고, 필요할 때 종족 문서로 렌더링한다.

- [ ] `id`
- [ ] 공통 컬럼
- [ ] `code`
- [ ] `name`
- [ ] `description`
- [ ] `category`
- [ ] `anatomyType`
- [ ] `bodyBuild`
- [ ] `surfaceTraits`
- [ ] `faceStructure`
- [ ] `silhouette`
- [ ] `materialTraits`
- [ ] `renderingKeywords`
- [ ] `sortOrder`
- [ ] `content`
- [ ] `metadata`

### classes 테이블 후보

클래스 아키타입 라이브러리의 클래스, 전투 성향, 파워 소스, 시그니처 정체성 등을 구조화해서 관리하고, 필요할 때 클래스 문서로 렌더링한다.

- [ ] `id`
- [ ] 공통 컬럼
- [ ] `code`
- [ ] `name`
- [ ] `description`
- [ ] `category`
- [ ] `characteristics`
- [ ] `poseDirection`
- [ ] `combatWeight`
- [ ] `combatStyle`
- [ ] `powerSource`
- [ ] `signatureIdentity`
- [ ] `renderingKeywords`
- [ ] `sortOrder`
- [ ] `content`
- [ ] `metadata`

### presets 테이블 후보

캐릭터 프리셋 라이브러리의 개별 프리셋을 구조화해서 관리하고, 필요할 때 프리셋 문서로 렌더링한다.

- [ ] `id`
- [ ] 공통 컬럼
- [ ] `code`
- [ ] `name`
- [ ] `description`
- [ ] `coreIdentity`
- [ ] `recommendedRank`
- [ ] `recommendedThemes`
- [ ] `recommendedRaceTypes`
- [ ] `recommendedClassArchetypes`
- [ ] `recommendedWeapons`
- [ ] `recommendedOutfitStyle`
- [ ] `recommendedFx`
- [ ] `recommendedLighting`
- [ ] `recommendedBackgrounds`
- [ ] `recommendedMood`
- [ ] `shapeLanguage`
- [ ] `renderingKeywords`
- [ ] `sortOrder`
- [ ] `content`
- [ ] `metadata`

## 개발 체크리스트

- [x] Drizzle 기본 설정
- [ ] Neon 연결 확인
- [x] AI SDK 사용 방식 확정
- [x] 기본 모델을 `gpt-4o-mini`로 설정
- [x] `md-docs` 파일 로더 작성
- [x] Markdown frontmatter 파서 선택
- [ ] 문서 의존성 해석 로직 작성
- [x] `docs` 테이블 생성
- [x] `prompts` 테이블 생성
- [x] `themes` 테이블 생성
- [x] `races` 테이블 생성
- [x] `classes` 테이블 생성
- [x] `presets` 테이블 생성
- [x] 공통 컬럼 Drizzle 헬퍼 설계
- [x] 라이브러리 테이블 공통 컬럼에 `code`, `name`, `description`, `sortOrder`, `content`, `metadata` 반영
- [ ] `docs`와 라이브러리 테이블의 관계 설계
- [ ] `docs`는 시스템 문서, `themes/races/classes/presets`는 독립 문서화 가능한 라이브러리 데이터로 역할 분리
- [ ] DB 데이터를 Markdown으로 렌더링하는 템플릿 작성
- [x] AI 컨텍스트 조립기 작성
- [ ] `alwaysLoad + dependencies + selected docs + selected library items` 조합 규칙 설계
- [ ] Markdown 파일과 `docs` 테이블 동기화 방식 결정
- [ ] DB 데이터에서 Markdown 생성 방식 결정
- [ ] 문서 관리 API 작성
- [ ] 프롬프트 관리 API 작성
- [x] AI 대화 API 작성
- [ ] `chatRooms` 테이블 생성
- [ ] `chatMessages` 테이블 생성
- [ ] 채팅방 관리 API 작성
- [ ] 채팅 메시지 저장 API 작성
- [ ] AI 응답 로그 저장 방식 구현
- [ ] 문서 관리 화면 작성
- [ ] 프롬프트 관리 화면 작성
- [x] AI 대화 화면 작성
- [x] 좌측 채팅방 목록 UI 작성
- [x] Enter 전송 / Shift + Enter 줄바꿈 입력 UX 작성
- [x] AI 어시스트 플랫폼 스타일로 채팅 UI 개선
- [ ] 좌측 채팅방 목록을 DB 데이터와 연결
- [ ] 새 채팅 버튼을 채팅방 생성 API와 연결
- [ ] 채팅방 클릭 시 메시지 로그 로드
- [ ] 좌측 채팅방 hover 시 휴지통 아이콘 표시
- [ ] 휴지통 클릭 시 채팅방 삭제 처리
- [ ] 최초 사용자 메시지 기반 채팅방 이름 자동 변경
- [ ] 생성된 프롬프트 저장 흐름 연결

## 실행

```bash
pnpm install
pnpm dev
```

## DB 명령어

```bash
pnpm db:generate
pnpm db:push
pnpm db:studio
```
