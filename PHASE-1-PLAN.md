# Phase 1 실행 계획 — 페이지 구조 정리 및 내비게이션 단순화

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** MVP 범위를 홈/인증으로 좁히기 — `/cities`, `/cities/[slug]` 라우트 삭제 및 홈·내비게이션에서 해당 경로로 향하는 링크 전부 제거

**Architecture:** 라우트 삭제 → 컴포넌트 삭제 → 링크 정리 순으로 의존성 방향에 따라 top-down으로 제거. 각 Task는 단일 책임(SRP). 이후 Phase 작업(카드 UI·필터)은 건드리지 않는다.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS

---

## 원칙

- Phase 1 SPEC에 정의된 항목만 처리한다.
- 한 Task에는 하나의 책임만 둔다 (SRP).
- 의존성을 끊을 때는 상위 → 하위 순서로 (DIP 준수).
- 각 Task 종료 시 `npm run lint`와 `npx tsc --noEmit` 실행, 실패 시 즉시 해결.
- 모든 npm 명령은 `nomad-korea/` 디렉터리 기준.

---

## Task 1: 불필요 파일 삭제

**파일:**
- 삭제: `src/app/cities/page.tsx`
- 삭제: `src/app/cities/[slug]/page.tsx`
- 삭제: `src/components/city-detail/` (7개 파일 전체)
- 삭제: `src/components/review/ReviewForm.tsx`

- [x] **Step 1.1** `src/app/cities/` 디렉터리 삭제
- [x] **Step 1.2** `src/components/city-detail/` 디렉터리 삭제
- [x] **Step 1.3** `src/components/review/ReviewForm.tsx` 삭제
- [x] **Step 1.4** lint + typecheck 통과 확인

```bash
cd nomad-korea
npx tsc --noEmit
npm run lint
```

예상 결과: 삭제된 파일을 import하던 `cities/[slug]/page.tsx`도 삭제됐으므로 타입 오류 없음.

---

## Task 2: Navbar 링크 정리

**파일:**
- 수정: `src/components/layout/Navbar.tsx`

**유지:** 로고 Link(`/`), 로그인/회원가입/로그아웃, 사용자 이메일  
**제거:** "도시 탐색"(`href="/cities"`), "평가 남기기"(`href="#review"`), 모바일 햄버거 버튼

- [x] **Step 2.1** "도시 탐색" / "평가 남기기" Link 제거
- [x] **Step 2.2** 모바일 햄버거 `<button className="md:hidden">` 제거
- [x] **Step 2.3** 사용되지 않는 `Menu` import 제거
- [x] **Step 2.4** 로그인/회원가입 버튼을 `<Link className={buttonVariants(...)}>` 형태로 유지 (Button asChild 패턴 미사용)

> 현재 Navbar.tsx 확인 결과: 인증 버튼만 남아 있고 /cities 링크·햄버거 버튼 없음 → 이미 완료.

- [x] **Step 2.5** lint + typecheck 통과 확인

```bash
npx tsc --noEmit
npm run lint
```

---

## Task 3: CityGrid 내 `/cities/[slug]` Link 제거

**파일:**
- 수정: `src/components/cities/CityGrid.tsx`

**변경:** 카드를 감싸던 `<Link href={/cities/${city.slug}}>` 제거, `<CityCard>` 직접 렌더링

- [x] **Step 3.1** CityCard를 감싸던 Link 제거하고 CityCard만 그리드에 남김
- [x] **Step 3.2** 사용 0이 된 `Link` import 제거

> 현재 CityGrid.tsx 확인 결과: Link 없이 CityCard 직접 렌더링 중 → 이미 완료.

- [x] **Step 3.3** lint + typecheck 통과 확인

```bash
npx tsc --noEmit
npm run lint
```

---

## Task 4: Footer `/cities` 링크 제거

**파일:**
- 수정: `src/components/layout/Footer.tsx`

**변경:** "도시 탐색" `<Link href="/cities">` → `href="#"` 또는 제거

> 현재 Footer.tsx 확인 결과: `/cities` href 없음 (이미 `#`으로 교체됨) → 이미 완료.

- [x] **Step 4.1** Footer 내 `/cities` Link 제거
- [x] **Step 4.2** lint + typecheck 통과 확인

```bash
npx tsc --noEmit
npm run lint
```

---

## Task 5: 홈 컴포넌트 링크 확인

**대상:** `HeroSection`, `CtaBanner`, `TopCitiesSection`, `RecentReviewsSection`, `SeasonalRecommendations`  
**확인 기준:** `/cities` 또는 `/cities/[slug]` href가 남아 있으면 제거

- [x] **Step 5.1** `HeroSection.tsx` 확인 — "도시 탐색하기"·"평가 남기기"는 `<Button>`으로 href 없음 → 처리 불필요
- [x] **Step 5.2** `CtaBanner.tsx` 확인 — "평가 작성하기"는 `<Button>`으로 href 없음 → 처리 불필요
- [x] **Step 5.3** `TopCitiesSection.tsx` 확인 — CityCard에 Link 없음 → 처리 불필요
- [x] **Step 5.4** `RecentReviewsSection.tsx` 확인 — /cities href 없음 → 처리 불필요
- [x] **Step 5.5** `SeasonalRecommendations.tsx` 확인 — /cities href 없음 → 처리 불필요

---

## Task 6: 최종 검증 (Phase 1 게이트)

SPEC "작업 완료 후 검증 사항" 전체 확인.

- [x] **Step 6.1** `npm run lint` → 오류 0
- [x] **Step 6.2** `npx tsc --noEmit` → 오류 0
- [x] **Step 6.3** `npm run build` → 성공
- [x] **Step 6.4** 빌드 output에 `/cities`, `/cities/jeju` 라우트 없음 확인 (/, /_not-found, /auth/callback, /login, /register만 존재)
- [x] **Step 6.5** Navbar 코드 점검: 로고 + 인증 버튼만 존재, 페이지 이동 링크 없음
- [x] **Step 6.6** 홈 컴포넌트 어디에도 `/cities` 경로 href 없음 (grep 결과 0)

```bash
# 6.6 검증 명령
grep -r 'href.*cities' src/ --include="*.tsx"
```

예상 결과: 출력 없음

---

## 현황 요약

| Task | 상태 |
|------|------|
| Task 1: 파일 삭제 | 삭제 완료, 검증 미실행 |
| Task 2: Navbar 정리 | 이미 완료, 검증 미실행 |
| Task 3: CityGrid 링크 제거 | 이미 완료, 검증 미실행 |
| Task 4: Footer 링크 제거 | 이미 완료, 검증 미실행 |
| Task 5: 홈 컴포넌트 확인 | 이미 완료 |
| Task 6: 최종 검증 | ✅ 완료 |

**→ 실질적으로 남은 작업: Task 6 최종 검증 (lint + typecheck + build)**
