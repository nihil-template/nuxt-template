# 기본 레이아웃 사이드바와 패널 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 모바일 Drawer와 데스크톱 Aside, 독립 스크롤, 재사용 가능한 패널 레이아웃 프리미티브를 구현한다.

**Architecture:** `CommonContent`가 Element Plus의 가로 `ElContainer`에서 `<aside>`를 만드는 `ElAside`와 `<main>`을 만드는 `ElMain`을 조합한다. `CommonSidebar`의 최상위는 `<nav>`이며 `navConfig`를 읽는다. `UiPanel`은 시각적 영역이고 `UiPanelDivider`는 비시각적 flex 컨테이너다.

**Tech Stack:** Nuxt 4, Vue 3, TypeScript, Element Plus, Pinia, Tailwind CSS 4, CVA, Vitest

**Spec:** `docs/superpowers/specs/2026-08-23-default-layout-panels-design.md`

## Global Constraints

- 768px 미만에서는 `ElAside`를 렌더링하지 않고 닫힌 `ElDrawer`만 사용한다.
- 768px 이상에서는 272px `ElAside`를 표시하고 Drawer는 표시하지 않는다.
- `ElAside`가 `<aside>`를 렌더링하므로 `CommonSidebar`의 최상위 태그는 `<nav aria-label="주요 메뉴">`다.
- `CommonSidebar`는 `app/config/nav.config.ts`의 `navConfig`만 사용한다.
- Sidebar와 main에는 `min-h-0 overflow-y-auto`, main에는 추가로 `min-w-0`를 적용한다.
- `UiPanelDivider`에는 배경, 테두리, 그림자, 구분선, 기본 간격을 두지 않는다.
- 모든 컴포넌트는 CVA, `class` prop, `cn()` 병합을 사용한다.
- 커밋과 푸시는 마스터가 별도로 요청할 때만 수행한다.

---

### Task 1: 설정 기반 사이드바와 패널 프리미티브

**Files:**
- Create: `app/components/layout/common/CommonSidebar.vue`
- Create: `app/components/ui/UiPanel.vue`
- Create: `app/components/ui/UiPanelDivider.vue`
- Modify: `test/app-sidebar.test.ts`
- Create: `test/ui-panel.test.ts`

**Interfaces:**
- Consumes: `navConfig: NavigationItem[]`, `NavigationItem { label: string; to: string; icon?: UiIconName }`, `cn()`.
- Produces: `CommonSidebar` event `navigate(item: NavigationItem)`.
- Produces: `UiPanel` with `class?: string` and default slot.
- Produces: `UiPanelDivider` with `direction?: 'row' | 'column'`, `class?: string`, and default slot.

- [ ] **Step 1: 실패 테스트를 작성한다.**

```ts
it('navConfig의 항목을 nav에 렌더링하고 선택 항목을 emit한다', async () => {
  const wrapper = mount(CommonSidebar, {
    global: {
      stubs: {
        NuxtLink: {
          props: { to: { required: true, type: String } },
          template: '<a :href="to"><slot /></a>',
        },
      },
    },
  });
  const item = navConfig[0]!;
  expect(wrapper.element.tagName).toBe('NAV');
  expect(wrapper.attributes('aria-label')).toBe('주요 메뉴');
  await wrapper.get(`a[href="${item.to}"]`).trigger('click');
  expect(wrapper.emitted('navigate')).toEqual([[item]]);
});

it('UiPanelDivider는 row 축만 적용하고 시각 클래스가 없다', () => {
  const wrapper = mount(UiPanelDivider, { props: { direction: 'row' } });
  expect(wrapper.classes()).toContain('flex-row');
  expect(wrapper.classes()).not.toContain('bg-white');
  expect(wrapper.classes()).not.toContain('border');
});
```

- [ ] **Step 2: 실패를 확인한다.**

Run: `pnpm exec vitest run test/app-sidebar.test.ts test/ui-panel.test.ts`

Expected: FAIL because the three components do not exist.

- [ ] **Step 3: 최소 구현을 작성한다.**

```vue
<!-- CommonSidebar.vue: aside를 만들지 않는다. -->
<nav aria-label="주요 메뉴">
  <ElMenu :default-active="route.path">
    <ElMenuItem v-for="item in navConfig" :key="item.to" :index="item.to">
      <NuxtLink :to="item.to" @click="emit('navigate', item)">
        {{ item.label }}
      </NuxtLink>
    </ElMenuItem>
  </ElMenu>
</nav>
```

```ts
const props = withDefaults(defineProps<{
  class?: string;
  direction?: 'row' | 'column';
}>(), {
  class: '',
  direction: 'column',
});

const cssVariants = cva('', {
  variants: {
    direction: {
      row: 'flex flex-row min-h-0 min-w-0',
      column: 'flex flex-col min-h-0 min-w-0',
    },
  },
  defaultVariants: { direction: 'column' },
});
```

`UiPanel`의 CVA 기본 클래스는 `bg-white border border-black-200 rounded-2 p-2`로 한다. 두 컴포넌트는 슬롯을 렌더링하고 `cn()`으로 외부 class를 병합한다.

- [ ] **Step 4: 대상 테스트를 통과시킨다.**

Run: `pnpm exec vitest run test/app-sidebar.test.ts test/ui-panel.test.ts`

Expected: PASS. `<nav>`, 설정 항목, `navigate` payload, Panel 시각 클래스, Divider 방향·비시각 계약을 검증한다.

### Task 2: CommonContent와 기본 레이아웃의 반응형 셸

**Files:**
- Modify: `app/components/layout/common/CommonHeader.vue`
- Modify: `app/components/layout/common/CommonContent.vue`
- Modify: `app/layouts/default.vue`
- Create: `test/default-layout.test.ts`

**Interfaces:**
- Consumes: `CommonSidebar`, `useAppStore().isSidebarOpen`, `onSetSidebarOpen(value: boolean)`.
- Produces: `CommonHeader` event `open-sidebar`.
- Produces: `CommonContent` event `navigate(item: NavigationItem)`.
- Produces: 데스크톱 `<aside>`/`<main>` 및 모바일 `ElDrawer` 레이아웃.

- [ ] **Step 1: 레이아웃 실패 테스트를 작성한다.**

```ts
it('메뉴 버튼은 Drawer 상태를 열고 sidebar navigate는 닫는다', async () => {
  setActivePinia(createPinia());
  const wrapper = mount(DefaultLayout, {
    global: { plugins: [createPinia()] },
    slots: { default: '<p>본문</p>' },
  });
  const store = useAppStore();
  await wrapper.get('[aria-label="메뉴 열기"]').trigger('click');
  expect(store.isSidebarOpen).toBe(true);
  await wrapper.findComponent(CommonSidebar).vm.$emit('navigate', navConfig[0]);
  expect(store.isSidebarOpen).toBe(false);
});

it('CommonContent는 aside와 main에 독립 스크롤 클래스를 적용한다', () => {
  const wrapper = mount(CommonContent, { slots: { default: '<article>본문</article>' } });
  expect(wrapper.get('aside').classes()).toContain('overflow-y-auto');
  expect(wrapper.get('main').classes()).toContain('overflow-y-auto');
});
```

- [ ] **Step 2: 실패를 확인한다.**

Run: `pnpm exec vitest run test/default-layout.test.ts`

Expected: FAIL because menu-button event, responsive Aside/Drawer, and independent scroll classes do not exist.

- [ ] **Step 3: 모바일 우선 Element Plus 셸을 구현한다.**

```vue
<!-- CommonContent.vue -->
<ElContainer class="flex-1 min-h-0">
  <ElAside class="hidden min-h-0 overflow-y-auto md:block" width="272px">
    <CommonSidebar @navigate="emit('navigate', $event)" />
  </ElAside>
  <ElMain class="min-w-0 min-h-0 overflow-y-auto">
    <slot />
  </ElMain>
</ElContainer>
```

```vue
<!-- default.vue -->
<ElContainer class="h-dvh overflow-hidden" direction="vertical">
  <CommonHeader @open-sidebar="appStore.onSetSidebarOpen(true)" />
  <CommonContent @navigate="appStore.onSetSidebarOpen(false)">
    <slot />
  </CommonContent>
  <CommonFooter />
  <ElDrawer v-model="appStore.isSidebarOpen" class="md:hidden" direction="ltr" size="272px" title="메뉴">
    <CommonSidebar @navigate="appStore.onSetSidebarOpen(false)" />
  </ElDrawer>
</ElContainer>
```

`CommonHeader`에 `md:hidden`과 `aria-label="메뉴 열기"`를 가진 `ElButton`을 추가해 `open-sidebar`를 emit한다. `CommonContent`의 `sidebar` prop과 텍스트 placeholder aside는 삭제한다.

- [ ] **Step 4: 레이아웃 테스트를 통과시킨다.**

Run: `pnpm exec vitest run test/default-layout.test.ts`

Expected: PASS. 메뉴 버튼, Pinia 상태, aside/main 스크롤 클래스, sidebar 탐색 뒤 Drawer 닫힘을 검증한다.

### Task 3: 실제 화면과 전체 회귀 검증

**Files:**
- Verify: Task 1 및 Task 2의 생성·수정 파일과 테스트 파일

**Interfaces:**
- Consumes: 사이드바, 패널, 반응형 셸 계약.
- Produces: 검증 근거 및 기존 실패의 분리 보고.

- [ ] **Step 1: 변경 파일 ESLint를 실행한다.**

Run: `pnpm exec eslint app/components/layout/common/CommonSidebar.vue app/components/layout/common/CommonContent.vue app/components/layout/common/CommonHeader.vue app/components/ui/UiPanel.vue app/components/ui/UiPanelDivider.vue app/layouts/default.vue test/app-sidebar.test.ts test/ui-panel.test.ts test/default-layout.test.ts`

Expected: PASS.

- [ ] **Step 2: 새 레이아웃 대상 테스트를 실행한다.**

Run: `pnpm exec vitest run test/app-sidebar.test.ts test/ui-panel.test.ts test/default-layout.test.ts`

Expected: PASS.

- [ ] **Step 3: 기존 3000 서버에서 반응형 화면을 확인한다.**

Run: 브라우저에서 `http://localhost:3000/`을 열고 390px 및 데스크톱 뷰포트를 검사한다.

Expected: 390px에서 Drawer 메뉴는 선택 후 닫히며, 데스크톱에는 272px aside가 표시된다. 긴 홈 본문은 main만 스크롤하고 데스크톱 sidebar도 별도로 스크롤한다.

- [ ] **Step 4: 전체 회귀를 분리 실행한다.**

Run: `pnpm test`, `pnpm exec vue-tsc --noEmit`, `pnpm build`, `git diff --check`

Expected: 명령별 성공·실패를 분리 기록한다. 기존 query/composable 누락으로 전체 테스트가 실패하면 새 레이아웃 대상 테스트 결과와 분리한다.
