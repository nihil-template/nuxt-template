# 중복 직접 의존성 정리 설계

## 목적

Element Plus가 전이 의존성으로 제공하는 패키지를 템플릿의 직접 의존성에서 제거해, 애플리케이션이 직접 책임지는 의존성 목록을 명확히 한다.

## 결정

- `@element-plus/icons-vue`, `dayjs`, `lodash-unified`의 직접 선언을 제거한다.
- 세 패키지는 Element Plus의 전이 의존성으로 유지되며, Element Plus 기능에는 영향을 주지 않는다.
- 향후 인증 구현에 사용할 `argon2`, `jose`는 유지한다.
- 버전 업데이트나 다른 의존성의 추가 제거는 이번 범위에 포함하지 않는다.

## 검증 기준

- `pnpm install --lockfile-only --offline --ignore-scripts`가 성공한다.
- 세 패키지가 `package.json`과 lockfile importer의 직접 의존성 목록에 없다.
- `pnpm test`, `pnpm exec vue-tsc --noEmit`, `pnpm build`가 성공한다.
- 기존 린트 오류는 이번 의존성 정리와 별도로 보고한다.
