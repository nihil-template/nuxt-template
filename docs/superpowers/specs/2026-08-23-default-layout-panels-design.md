# 기본 레이아웃 사이드바와 패널 설계

## 목적

Nuxt 템플릿의 기본 레이아웃을 모바일 우선 앱 셸로 구성한다. 좌측 영역은 `nav.config.ts`의 메뉴를 Element Plus로 렌더링하는 사이드바이고, 우측 영역은 페이지가 제공하는 슬롯 본문이다. 두 영역은 서로 독립적으로 세로 스크롤한다.

본문에서 재사용할 영역 프리미티브도 제공한다. `UiPanel`만 시각적 실체를 가지며, `UiPanelDivider`는 패널을 상하 또는 좌우로 배치하는 비시각적 flex 컨테이너다.

## 화면 동작

### 모바일: 768px 미만

- 본문을 기본 표시한다.
- 데스크톱용 `ElAside`는 렌더링하지 않는다.
- 헤더의 메뉴 버튼이 `useAppStore().isSidebarOpen`을 `true`로 설정한다.
- `ElDrawer`가 좌측에서 열리고 내부에 `CommonSidebar`를 렌더링한다.
- 메뉴를 선택하면 이동 후 Drawer를 닫는다.

### 데스크톱: 768px 이상

- `ElAside`를 272px 너비로 항상 표시한다.
- `ElAside` 안의 `CommonSidebar`만 스크롤한다.
- `ElMain` 안의 페이지 슬롯 본문만 독립 스크롤한다.
- `ElAside`와 `ElMain`의 직접 자식은 각각 `UiPanel`이다. 사이드바 패널은 전체 높이를, 본문 패널은 최소 전체 높이를 차지한다.
- `ElAside`와 `ElMain`에는 같은 외곽 여백을 적용한다. 두 `UiPanel`의 테두리와 둥근 모서리가 같은 좌표계에서 보이도록 한쪽만 컨테이너에 밀착시키지 않는다.
- 모바일 Drawer는 표시하지 않는다.

## Element Plus 셸 구조

`default.vue`는 다음 구조만 조합한다. 실제 메뉴 내용과 본문 내용은 각각 하위 컴포넌트와 슬롯에 둔다.

```text
ElContainer → <section> (세로, 전체 뷰포트)
├─ CommonHeader → <header>
├─ CommonContent
│  └─ ElContainer → <section> (가로)
│     ├─ ElAside → <aside> (데스크톱)
│     │  └─ CommonSidebar → <nav>
│     │     └─ ElMenu
│     └─ ElMain → <main>
│        └─ slot
├─ CommonFooter → <footer>
└─ ElDrawer → <div> (모바일)
   └─ CommonSidebar → <nav>
      └─ ElMenu
```

`CommonContent`의 바깥 컨테이너에는 `flex-1 min-h-0`를 적용한다. 사이드바와 본문에는 각각 `min-h-0 overflow-y-auto`를 적용하고, 본문에는 `min-w-0`도 적용한다. 이 제약으로 긴 Lorem Ipsum 본문이 헤더·푸터를 밀어내지 않고 본문 영역만 스크롤한다.

## 컴포넌트 계약

### `CommonSidebar`

- 최상위 HTML 태그는 `<nav aria-label="주요 메뉴">`다. `ElAside`가 이미 최상위 `<aside>`를 렌더링하므로, 이 컴포넌트는 `<aside>`를 추가로 만들지 않는다.
- `app/config/nav.config.ts`의 `navConfig`만 읽는다.
- `ElMenu`와 `ElMenuItem`을 사용해 각 `NavigationItem`의 `label`, `to`, 선택적 `icon`을 렌더링한다.
- 현재 경로를 활성 메뉴로 표시한다.
- 항목 선택 시 `navigate` 이벤트를 emit한다. 레이아웃은 이 이벤트로 모바일 Drawer만 닫는다.
- 외부 `class` prop을 받고 CVA 및 `cn()`으로 병합한다.

### `UiPanel`

- 실제 콘텐츠 영역이다.
- 기본값으로 배경, 테두리, 둥근 모서리, 내부 여백을 제공한다.
- 자식 콘텐츠는 슬롯으로 받고 외부 `class` prop을 CVA 및 `cn()`으로 병합한다.
- 스크롤은 강제하지 않는다. 각 화면 또는 `UiPanelDivider` 사용처가 필요한 축의 크기·스크롤을 결정한다.

### `UiPanelDivider`

- 시각적 속성이 없는 flex 컨테이너다. 배경, 테두리, 그림자, 구분선, 기본 간격을 갖지 않는다.
- `direction` prop은 `'row' | 'column'`이며 기본값은 `'column'`이다.
- `row`는 자식 패널을 좌우로, `column`은 상하로 배치한다.
- 중첩할 수 있으며, 좁은 화면에서 별도 자동 방향 전환은 하지 않는다. 사용처가 명시적으로 방향을 정한다.
- 외부 `class` prop을 CVA 및 `cn()`으로 병합한다.

## 접근성과 상태

- 모바일 메뉴 버튼에는 `aria-label="메뉴 열기"`를 설정한다.
- Drawer 제목은 `메뉴`로 한다.
- `isSidebarOpen`은 모바일 Drawer 상태만 보관한다. 데스크톱 Aside 표시 상태에는 사용하지 않는다.
- 사이드바의 메뉴는 의미 있는 `nav` 랜드마크 안에 둔다.

## 범위 제외

- `nav.config.ts`의 현재 메뉴 데이터 확장
- 패널 크기 조절, 드래그 분할, 분할선 표시
- 다른 테스트 파일이 참조하는 과거 query/composable 모듈의 복구

## 검증

- `CommonSidebar`가 `navConfig`의 모든 항목을 렌더링하고 `navigate` 이벤트를 내보내는지 테스트한다.
- `UiPanel`과 `UiPanelDivider`가 props·slot·class 병합 계약을 지키는지 테스트한다.
- 레이아웃이 데스크톱 Aside와 모바일 Drawer를 올바르게 분기하고, 메뉴 선택 뒤 Drawer를 닫는지 테스트한다.
- 기존 3000 개발 서버에서 390px 모바일과 데스크톱 화면을 확인한다. 긴 홈 본문으로 본문 스크롤과 사이드바 스크롤의 독립성을 확인한다.
- 변경 파일 ESLint, `vue-tsc`, 전체 테스트, 빌드를 각각 실행한다. 기존 실패가 남으면 변경과 무관한 실패로 분리해 보고한다.
