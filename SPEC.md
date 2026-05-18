# nomad-korea MVP 단순화 실행 계획

**대상 프로젝트:** `nomad-korea/`
**전제:** DB 없이 가짜 데이터(`src/lib/mock-data.ts`) 기반. 각 Phase는 독립적으로 빌드/실행 가능.

---

## - [ ] Phase 1 — 페이지 구조 정리 및 내비게이션 단순화

### 오버뷰
MVP 범위를 홈/인증으로 좁히는 단계. 도시 상세 페이지(`/cities/[slug]`)와 도시 탐색 페이지(`/cities`)를 제거하고, 홈+로그인+회원가입만 남긴다. 내비게이션에서도 페이지 이동 링크를 인증 관련 버튼만 남도록 정리한다. 이 Phase가 끝나면 라우트가 단순해져 이후 단계에서 한 페이지에 집중할 수 있다.

**작업 위치 힌트**
- [ ] 삭제 후보: `nomad-korea/src/app/cities/`, `nomad-korea/src/components/city-detail/`, `nomad-korea/src/components/review/`
- [ ] 수정: `nomad-korea/src/components/layout/Navbar.tsx`, `nomad-korea/src/app/page.tsx`, `nomad-korea/src/components/home/*` (다른 페이지로 향하는 Link)
- [ ] 유지: `nomad-korea/src/app/login/`, `nomad-korea/src/app/register/`, `nomad-korea/src/app/auth/`

### 수정/개선 사항
- [ ] `src/app/cities/` 디렉터리 전체 삭제 (`page.tsx`, `[slug]/page.tsx`)
- [ ] `src/components/city-detail/` 디렉터리 전체 삭제 (Tabs, ReviewTab 등 7개 파일)
- [ ] `src/components/review/ReviewForm.tsx` 삭제 (도시 상세에서만 사용되던 컴포넌트인지 grep으로 사용처 확인 후 삭제)
- [ ] `Navbar.tsx`에서 "도시 탐색"(`href="/cities"`), "평가 남기기"(`href="#review"`) 링크 삭제
- [ ] 모바일 햄버거 메뉴(`md:hidden`) 버튼은 현재 핸들러가 없으므로, 노출되는 링크 제거에 맞춰 숨김 처리 또는 삭제
- [ ] 홈 내부 컴포넌트(`HeroSection`, `CtaBanner`, `RecentReviewsSection`, `SeasonalRecommendations`, `TopCitiesSection`)에서 `/cities` 또는 `/cities/[slug]`로 향하는 모든 `Link`/`href` 제거 또는 홈 내 앵커(`#city-list`)로 교체
- [ ] `src/app/page.tsx`에서 사용 중지될 섹션이 있다면 import도 함께 제거 (남기는 섹션은 Phase 4에서 결정)

### 작업 완료 후 검증 사항
- [ ] `npm run build` 성공 (삭제된 파일 import 누락 없음)
- [ ] `npm run dev` 후 `/`, `/login`, `/register` 모두 200 응답
- [ ] `/cities`, `/cities/jeju` 접속 시 404 반환
- [ ] Navbar에 보이는 페이지 이동 링크가 로고(홈) 외에 없음 (로그인/회원가입/로그아웃만 표시)
- [ ] 홈 페이지 내부 어떤 버튼/카드를 눌러도 삭제된 경로로 가지 않음 (브라우저 콘솔에 404 로그 없음)
- [ ] `npm run lint` 오류 0

---

## - [ ] Phase 2 — 데이터 모델 및 가짜 데이터 재정의

### 오버뷰
새 필터(예산/지역/환경/최고 계절)와 좋아요·싫어요 기능을 뒷받침할 데이터 모델을 만든다. 별점(rating)·리뷰수(reviewCount) 같은 더 이상 쓰지 않는 필드는 제거하고, 8개 도시 각각에 4가지 필터 값이 최소 하나씩 들어가도록 가짜 데이터를 갱신한다. UI는 이 Phase에서 깨질 수 있으나, 타입 충돌이 없도록 컴포넌트 측 사용 지점도 동시 수정한다(임시 표시로 유지, 디자인은 Phase 3에서).

**작업 위치 힌트**
- [ ] 수정: `nomad-korea/src/lib/mock-data.ts`
- [ ] 영향: `nomad-korea/src/components/cities/CityCard.tsx`, `CityGrid.tsx`, `nomad-korea/src/components/home/TopCitiesSection.tsx`

### 필터 값 정의 (가짜 데이터 기준)
- [ ] **예산** `budget`: `"under100"` | `"100to200"` | `"over200"` (라벨: 100만원 / 100~200만원 / 200만원 이상)
- [ ] **지역** `regionFilter`: `"수도권"` | `"경상도"` | `"전라도"` | `"강원도"` | `"제주도"` | `"충청도"` (필터에는 "전체" 옵션 추가, 데이터 자체에는 6개 중 하나)
- [ ] **환경** `environment`: `"자연친화"` | `"도심선호"` | `"카페작업"` | `"코워킹 필수"` (각 도시 1개 이상의 배열)
- [ ] **최고 계절** `bestSeason`: `"봄"` | `"여름"` | `"가을"` | `"겨울"`
- [ ] **반응** `likes: number`, `dislikes: number` (초기값 임의 부여, 정렬에 사용)

### 수정/개선 사항
- [ ] `City` 인터페이스에 `budget`, `regionFilter`, `environment: string[]`, `bestSeason`, `likes`, `dislikes` 추가
- [ ] `City` 인터페이스에서 `rating`, `reviewCount`, `score`, `rank`, `internetSpeed`, `workspaceCount`, `safety`, `weather`, `tags`, `nomadCount`, `ktxTime`, `subsidy`, `monthlyCost` 중 사용 종료할 필드 결정 후 제거 (최소 `rating`, `reviewCount`는 제거 필수)
- [ ] `MOCK_CITIES` 8개 도시 각각에 새 필드 값 채우기. 도시별 1개 이상의 환경 태그 보장 (예: 제주시 → `["자연친화", "카페작업"]`)
- [ ] `MOCK_REVIEWS`, `SEASONAL_CITIES` 사용 여부 점검 후 미사용이면 제거
- [ ] 타입 변경으로 깨지는 곳(`CityCard.tsx`의 `rating`/`reviewCount`/`score` 등 참조)을 임시로 안전하게 수정 (옵셔널 처리 또는 표시 제거). 본격 디자인은 Phase 3에서 진행
- [ ] `TopCitiesSection.tsx`의 `MOCK_CITIES.slice(0, 3)` 등 데이터 접근부 정상 동작 확인

### 작업 완료 후 검증 사항
- [ ] `npx tsc --noEmit` 통과 (타입 에러 0)
- [ ] `npm run build` 성공
- [ ] `npm run dev` 실행 시 홈 페이지가 런타임 에러 없이 렌더링 (디자인은 임시 상태여도 OK)
- [ ] 모든 8개 도시가 `budget`/`regionFilter`/`environment`/`bestSeason`/`likes`/`dislikes` 값을 모두 갖는지 데이터 파일에서 시각적으로 확인
- [ ] 각 도시의 `environment` 배열 길이가 1 이상
- [ ] 별점(`★`, `Star` 아이콘) 잔존 여부 grep 결과 0 또는 Phase 3 처리 대상으로만 남아 있음

---

## - [ ] Phase 3 — 카드 UI 개편 (Key-Value 구조 + 좋아요/싫어요)

### 오버뷰
카드 한 장의 정보 구조를 새 필터(예산/지역/환경/최고 계절)와 좋아요·싫어요 중심으로 다시 만든다. 카드 본문은 4개 항목을 Key-Value 행으로 보여주고, 카드 하단에는 [좋아요]/[싫어요] 두 버튼을 둔다. 버튼 클릭 시 해당 버튼의 아이콘 색이 활성 상태로 바뀌고 숫자가 1 증가, 다시 누르면 취소되어 색·숫자가 원복된다. "자세히 보기" 버튼은 완전히 제거한다. 좋아요/싫어요 상태는 클라이언트 메모리(useState)에서만 관리한다(DB 없음).

**작업 위치 힌트**
- [ ] 수정: `nomad-korea/src/components/cities/CityCard.tsx` → Client Component(`"use client"`)로 전환
- [ ] 신규: 좋아요/싫어요 토글 훅이 필요하면 `CityCard` 내부 useState만으로 충분
- [ ] 영향: `CityGrid.tsx`, `TopCitiesSection.tsx` (props 변화 시)

### UI 사양
- [ ] **상단 영역**: 도시명/지역 텍스트 유지 (그라데이션 배경 유지 또는 단순화 — 선택)
- [ ] **Key-Value 본문** (한 줄당 1개 항목, 좌측 라벨 회색, 우측 값 진한 색):
  - [ ] `예산` : "100만원" / "100~200만원" / "200만원 이상"
  - [ ] `지역` : 6개 지역 중 하나
  - [ ] `환경` : 환경 태그 1~N개를 Badge 묶음으로
  - [ ] `최고 계절` : 봄/여름/가을/겨울 + 이모지
- [ ] **하단 액션**: 좋아요/싫어요 버튼 두 개
  - [ ] 좋아요: `ThumbsUp` 아이콘, 활성 시 indigo-600(파란계열), 비활성 시 gray-400
  - [ ] 싫어요: `ThumbsDown` 아이콘, 활성 시 red-500, 비활성 시 gray-400
  - [ ] 각 버튼 옆에 숫자 (`likes` / `dislikes`)
  - [ ] 좋아요와 싫어요는 상호 배타(좋아요 누르면 기존 싫어요 취소)
- [ ] **제거**: `Star` 아이콘 및 별점, `rating`/`reviewCount` 표시, "자세히 보기"로 분류되는 모든 버튼/링크, 종합점수 Progress 바(불필요 시)

### 수정/개선 사항
- [ ] `CityCard.tsx` 상단에 `"use client"` 선언 추가
- [ ] `useState<"like" | "dislike" | null>(null)`로 사용자 반응 상태 관리, 표시용 카운트는 `city.likes/dislikes`에서 파생값으로 계산
- [ ] 좋아요/싫어요 버튼 클릭 핸들러 구현 (동일 버튼 재클릭 시 취소, 반대 버튼 클릭 시 전환)
- [ ] 별점(`Star`) 렌더링 코드와 관련 색상 상수 삭제
- [ ] Wifi/안전등급 등 새 필터에 포함되지 않는 부가 정보 행은 제거(`internetSpeed`, `safety` 표시 라인 등)
- [ ] 4개 필터를 Key-Value 행으로 렌더링하는 마크업 작성 (`<dl>`/`<dt>`/`<dd>` 또는 grid 2열)
- [ ] "자세히 보기" 텍스트/버튼이 잔존하면 삭제 (grep으로 `자세히 보기`, `상세`, `View detail` 검색)
- [ ] 카드 전체를 감싸던 `Link`가 있다면 제거 (카드 자체는 더 이상 어디로도 이동하지 않음)
- [ ] `lucide-react`에서 `ThumbsUp`, `ThumbsDown` import 추가, 사용하지 않게 된 아이콘 import 정리

### 작업 완료 후 검증 사항
- [ ] 도시 카드에 4개 항목(예산/지역/환경/최고 계절)이 모두 Key-Value 형태로 표시됨
- [ ] 카드에 별점 아이콘과 별점 숫자가 더 이상 보이지 않음 (시각 확인)
- [ ] 좋아요 버튼 클릭 → 아이콘 색이 활성색으로 변하고 숫자가 +1
- [ ] 같은 좋아요 버튼 재클릭 → 색·숫자 원복
- [ ] 좋아요 활성 상태에서 싫어요 클릭 → 좋아요 -1 및 비활성, 싫어요 +1 및 활성
- [ ] 페이지 새로고침 시 클릭 상태가 초기화됨 (DB/스토리지 미사용 확인)
- [ ] "자세히 보기"/상세로 이동 버튼이 카드와 페이지 어디에도 없음
- [ ] `npm run build` 및 `npm run lint` 통과
- [ ] 키보드 Tab으로 좋아요/싫어요 버튼 포커스 이동 가능, Enter로 동작 (접근성 최소 확인)

---

## - [ ] Phase 4 — 필터 시스템 및 홈 섹션 재구성

### 오버뷰
필터바를 4개(예산/지역/환경/최고 계절)로 교체하고, "🏆 이번달 인기 도시 Top 3" 섹션 제목을 "도시 리스트"로 바꾼다. 표시되는 도시는 8개 전체, 정렬 기준은 `likes` 내림차순. 필터를 선택하면 조건에 맞는 도시만 카드로 표시된다. 페이지가 1개로 단순해진 만큼 홈 페이지에서 중복/잉여 섹션은 제거하거나 통합한다.

**작업 위치 힌트**
- [ ] 수정: `nomad-korea/src/components/cities/FilterBar.tsx` → Client Component로 4개 필터
- [ ] 수정: `nomad-korea/src/components/cities/CityGrid.tsx` → 필터 상태 수신, 정렬·필터링
- [ ] 수정: `nomad-korea/src/components/home/TopCitiesSection.tsx` → 제목/내용 변경 또는 제거 후 CityGrid로 통합
- [ ] 수정: `nomad-korea/src/app/page.tsx` → 섹션 구성 정리

### 필터 UI 사양
- [ ] **예산** 셀렉트: 전체 / 100만원 / 100~200만원 / 200만원 이상
- [ ] **지역** 셀렉트: 전체 / 수도권 / 경상도 / 전라도 / 강원도 / 제주도 / 충청도
- [ ] **환경** 셀렉트(또는 멀티 토글): 전체 / 자연친화 / 도심선호 / 카페작업 / 코워킹 필수
- [ ] **최고 계절** 셀렉트: 전체 / 봄 / 여름 / 가을 / 겨울
- [ ] 정렬 옵션은 좋아요 순 고정(드롭다운 제거 또는 단일 옵션)

### 수정/개선 사항
- [ ] `FilterBar.tsx`의 기존 옵션(`CATEGORIES`, `INTERNET_OPTIONS`, `SEASONS`, 정렬 셀렉트) 제거
- [ ] 새 4개 필터 셀렉트 추가, 각 셀렉트는 "전체"를 기본값으로
- [ ] `FilterBar`를 Client Component로 만들고, 상위에 필터 상태를 끌어올림 (`useState` in `page.tsx` 또는 새 클라이언트 래퍼)
- [ ] `CityGrid.tsx`가 필터 객체를 props로 받아 `MOCK_CITIES`를 필터링·정렬(좋아요 내림차순)
- [ ] `TopCitiesSection.tsx` 제거 또는 제목만 변경(`🏆 이번달 인기 도시 Top 3` → `도시 리스트`)하고 `slice(0, 3)` 삭제하여 전체 노출. CityGrid와 중복되면 한쪽으로 통합
- [ ] `src/app/page.tsx`에서 사용 종료한 섹션 import 삭제 (`RecentReviewsSection`, `SeasonalRecommendations`, `CtaBanner` 중 명시 요구 외 항목은 유지/삭제를 사용자와 확인하지 말고 일단 유지하되 홈 내부 페이지 이동 링크는 Phase 1에서 이미 정리됨)
- [ ] 필터 조건에 해당하는 도시가 0개일 때 빈 상태 메시지 표시 ("조건에 맞는 도시가 없습니다")
- [ ] 환경 필터는 도시의 `environment` 배열에 선택값이 `includes`되면 통과하는 식으로 매칭

### 작업 완료 후 검증 사항
- [ ] 홈 페이지 상단 섹션 제목이 "도시 리스트"
- [ ] 필터를 모두 "전체"로 두면 8개 도시 전부 표시되고, `likes` 내림차순으로 정렬됨 (가장 좋아요 많은 도시가 첫 카드)
- [ ] 예산 "100만원" 선택 시 `budget === "under100"`인 도시만 표시
- [ ] 지역 "강원도" 선택 시 강원도 도시만 표시
- [ ] 환경 "카페작업" 선택 시 `environment`에 "카페작업"이 포함된 도시만 표시
- [ ] 최고 계절 "겨울" 선택 시 `bestSeason === "겨울"`인 도시만 표시
- [ ] 두 필터를 동시에 적용해도 AND 조건으로 정상 필터링
- [ ] 결과가 0개일 때 빈 상태 메시지가 보임
- [ ] 카드의 좋아요 버튼을 눌러도 정렬은 새로고침 전까지 그대로(상태 비영속 정상)
- [ ] `npm run build`, `npm run lint`, `npx tsc --noEmit` 모두 통과
- [ ] 최종 모습: 홈에 헤로 + "도시 리스트" 섹션(필터바 + 카드 그리드)만 핵심으로 보이며, 모든 카드에 별점 없음 / Key-Value 4행 / 좋아요·싫어요 버튼 존재

---

**진행 방식 제안:** Phase 1 → 2 → 3 → 4 순서로 진행하되, 각 Phase 종료 시점마다 `npm run dev`로 시각 확인 + 빌드 통과를 게이트로 둔다. 각 Phase는 독립 커밋(또는 PR) 단위로 분리.
