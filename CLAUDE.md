# nomad-korea 프로젝트 가이드

## 기술 스택

- **프레임워크**: Next.js (App Router) + TypeScript
- **DB/Auth**: Supabase
- **스타일**: Tailwind CSS + shadcn/ui
- **유닛 테스트**: Vitest + @testing-library/react
- **E2E 테스트**: Playwright

---

## 유닛 테스트

```
src/__tests__/
├── lib/
│   ├── utils.test.ts               # cn() 유틸리티
│   └── supabase/
│       └── queries.test.ts         # mapDbCity, getCities, getUserReactions
├── app/actions/
│   └── reactions.test.ts           # toggleReaction 서버 액션
└── components/cities/
    ├── CityCard.test.ts            # calcCounts, calcGradientIndex, calcNextReaction
    ├── CityListSection.test.ts     # filterCities 필터링+정렬 로직
    └── FilterBar.test.ts           # applyFilterChange 필터 헬퍼
```

**실행**: `npm run test:run`

순수 함수 위주로 테스트한다. 컴포넌트 인라인 로직은 테스트 가능하도록 파일 상단에 `export` 순수 함수로 추출되어 있다.

---

## E2E 테스트 (Playwright)

### 구조

```
playwright.config.ts                # Playwright 설정
e2e/
├── .auth/                          # 로그인 세션 저장소 (.gitignore)
│   └── user.json                   # auth.setup.ts가 생성 (커밋 금지)
├── setup/
│   └── auth.setup.ts               # 로그인 후 storageState 저장 (전역 1회 실행)
├── pages/                          # Page Object Models
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   └── RegisterPage.ts
└── tests/
    ├── home.spec.ts                # 홈 페이지, 필터 (guest)
    ├── auth.spec.ts                # 로그인/회원가입/리다이렉트 (guest)
    ├── reactions.spec.ts           # 비로그인 반응 롤백 (guest)
    └── reactions.auth.spec.ts      # 로그인 반응 (authenticated)
```

### Playwright 프로젝트

| 프로젝트 | 대상 파일 | 인증 상태 |
|---------|----------|----------|
| `setup` | `auth.setup.ts` | — |
| `guest` | `*.spec.ts` (`.auth` 제외) | 없음 |
| `authenticated` | `*.auth.spec.ts` | `e2e/.auth/user.json` 주입 |

`authenticated` 프로젝트는 `setup`에 의존한다. `setup`이 먼저 실행되어 `user.json`을 생성한 뒤 세션을 재사용한다.

### 인증 전략

`auth.setup.ts`는 UI 로그인 대신 **Supabase API 직접 호출**로 세션을 생성한다. auth.spec.ts에서 로그인 UI를 이미 테스트하므로 setup 단계에서는 속도와 안정성을 우선한다.

실행 전 `.env.local`에 테스트 계정 정보가 필요하다:
```
TEST_USER_EMAIL=
TEST_USER_PASSWORD=
```

### Page Object Model 원칙

- 셀렉터와 액션은 POM 클래스 안에서만 정의한다
- 테스트 파일에서 DOM 셀렉터를 직접 작성하지 않는다
- POM 메서드는 사용자 행동 단위로 추상화한다 (예: `loginPage.login(email, pw)`)

### 실행 명령

```bash
npm run test:e2e          # headless 실행
npm run test:e2e:ui       # UI 모드 (인터랙티브 디버깅)
```
