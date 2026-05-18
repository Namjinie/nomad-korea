# Phase 2~4 실행 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans

**Goal:** 데이터 모델 재정의 → 카드 UI 개편 → 필터 시스템 구축

**Architecture:** Phase 순서대로 진행 (각 Phase가 이전 결과물에 의존). 상태는 필요한 최상위 컴포넌트에서 관리(State Lifting). 파일별 단일 책임 원칙 유지.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, lucide-react, shadcn/ui

---

## 변경 파일 목록

| Phase | 파일 | 작업 |
|-------|------|------|
| 2 | `src/lib/mock-data.ts` | City 타입 재정의 + 데이터 업데이트 |
| 2 | `src/components/cities/CityCard.tsx` | 삭제 필드 참조 임시 제거 |
| 2 | `src/components/home/TopCitiesSection.tsx` | showRank prop 제거 |
| 3 | `src/components/cities/CityCard.tsx` | Client Component + Key-Value UI + 좋아요/싫어요 |
| 4 | `src/components/cities/FilterBar.tsx` | 4개 필터로 교체, FilterState 타입 export |
| 4 | `src/components/cities/CityGrid.tsx` | cities prop 수신으로 변경 |
| 4 | `src/components/cities/CityListSection.tsx` | 신규 생성 (Client 래퍼) |
| 4 | `src/app/page.tsx` | TopCitiesSection → CityListSection 교체 |

---

## ─── Phase 2: 데이터 모델 재정의 ───

### Task 2-1: City 타입 재정의 및 MOCK_CITIES 업데이트

**파일:** `src/lib/mock-data.ts`

- [x] **Step 2-1.1** `mock-data.ts` 전체를 아래 내용으로 교체

```typescript
export type Budget = "under100" | "100to200" | "over200";
export type RegionFilter = "수도권" | "경상도" | "전라도" | "강원도" | "제주도" | "충청도";
export type Environment = "자연친화" | "도심선호" | "카페작업" | "코워킹 필수";
export type Season = "봄" | "여름" | "가을" | "겨울";

export interface City {
  slug: string;
  name: string;
  region: string;
  budget: Budget;
  regionFilter: RegionFilter;
  environment: Environment[];
  bestSeason: Season;
  likes: number;
  dislikes: number;
}

export const MOCK_CITIES: City[] = [
  {
    slug: "jeju",
    name: "제주시",
    region: "제주특별자치도",
    budget: "100to200",
    regionFilter: "제주도",
    environment: ["자연친화", "카페작업"],
    bestSeason: "봄",
    likes: 234,
    dislikes: 12,
  },
  {
    slug: "gangneung",
    name: "강릉",
    region: "강원도",
    budget: "100to200",
    regionFilter: "강원도",
    environment: ["자연친화", "카페작업"],
    bestSeason: "여름",
    likes: 187,
    dislikes: 8,
  },
  {
    slug: "busan",
    name: "부산",
    region: "부산광역시",
    budget: "100to200",
    regionFilter: "경상도",
    environment: ["도심선호", "카페작업"],
    bestSeason: "가을",
    likes: 312,
    dislikes: 15,
  },
  {
    slug: "gyeongju",
    name: "경주",
    region: "경상북도",
    budget: "under100",
    regionFilter: "경상도",
    environment: ["자연친화"],
    bestSeason: "봄",
    likes: 98,
    dislikes: 5,
  },
  {
    slug: "yeosu",
    name: "여수",
    region: "전라남도",
    budget: "100to200",
    regionFilter: "전라도",
    environment: ["자연친화", "카페작업"],
    bestSeason: "여름",
    likes: 143,
    dislikes: 9,
  },
  {
    slug: "sokcho",
    name: "속초",
    region: "강원도",
    budget: "100to200",
    regionFilter: "강원도",
    environment: ["자연친화", "코워킹 필수"],
    bestSeason: "여름",
    likes: 89,
    dislikes: 4,
  },
  {
    slug: "jeonju",
    name: "전주",
    region: "전라북도",
    budget: "under100",
    regionFilter: "전라도",
    environment: ["카페작업", "코워킹 필수"],
    bestSeason: "봄",
    likes: 112,
    dislikes: 7,
  },
  {
    slug: "tongyeong",
    name: "통영",
    region: "경상남도",
    budget: "100to200",
    regionFilter: "경상도",
    environment: ["자연친화"],
    bestSeason: "가을",
    likes: 76,
    dislikes: 6,
  },
];

export const MOCK_REVIEWS = [
  {
    id: 1,
    userName: "김노마드",
    cityName: "제주시",
    duration: "3개월",
    rating: 5,
    tags: ["#카페", "#자연", "#추천"],
    summary: "제주도는 노마드의 천국입니다. 카페가 넘쳐나고 인터넷도 빠릅니다.",
    avatar: "김",
  },
  {
    id: 2,
    userName: "이원격",
    cityName: "강릉",
    duration: "1개월",
    rating: 4,
    tags: ["#바다뷰", "#조용함"],
    summary: "파도 소리 들으며 코딩하는 경험, 강릉에서만 가능합니다.",
    avatar: "이",
  },
  {
    id: 3,
    userName: "박재택",
    cityName: "부산",
    duration: "2개월",
    rating: 4,
    tags: ["#대도시", "#편의시설"],
    summary: "대도시 인프라와 바다를 동시에 누릴 수 있는 최고의 선택.",
    avatar: "박",
  },
];

export const SEASONAL_CITIES = {
  spring: [
    { name: "경주", reason: "벚꽃과 유적지 산책", avgTemp: "14~20°C", score: 82 },
    { name: "전주", reason: "한옥마을 봄 축제", avgTemp: "12~18°C", score: 76 },
    { name: "제주시", reason: "유채꽃과 한라산 트레킹", avgTemp: "12~18°C", score: 91 },
  ],
  summer: [
    { name: "강릉", reason: "경포대 해수욕장", avgTemp: "24~30°C", score: 87 },
    { name: "속초", reason: "설악산 계곡과 바다", avgTemp: "22~28°C", score: 78 },
    { name: "여수", reason: "밤바다 야경", avgTemp: "26~32°C", score: 80 },
  ],
  autumn: [
    { name: "경주", reason: "단풍과 역사 유적", avgTemp: "14~20°C", score: 82 },
    { name: "통영", reason: "쪽빛 바다와 가을 하늘", avgTemp: "18~24°C", score: 74 },
    { name: "전주", reason: "가을 한옥마을 감성", avgTemp: "12~18°C", score: 76 },
  ],
  winter: [
    { name: "제주시", reason: "따뜻한 겨울, 동백꽃", avgTemp: "8~14°C", score: 91 },
    { name: "부산", reason: "온화한 기후와 따뜻한 음식", avgTemp: "6~12°C", score: 85 },
    { name: "여수", reason: "겨울 바다와 야경", avgTemp: "4~10°C", score: 80 },
  ],
};
```

---

### Task 2-2: CityCard 임시 수정 (삭제된 필드 참조 제거)

**파일:** `src/components/cities/CityCard.tsx`

Phase 3에서 카드 UI를 전면 재설계하므로, 이 단계에서는 타입 오류만 제거하는 최소 수정.

- [x] **Step 2-2.1** `CityCard.tsx` 전체를 아래 내용으로 교체

```tsx
import { Card, CardContent } from "@/components/ui/card";
import { City } from "@/lib/mock-data";

const GRADIENT_MAP = [
  "from-blue-400 to-cyan-500",
  "from-emerald-400 to-teal-500",
  "from-orange-400 to-amber-500",
  "from-purple-400 to-pink-500",
  "from-rose-400 to-red-500",
  "from-indigo-400 to-blue-500",
  "from-yellow-400 to-orange-500",
  "from-teal-400 to-green-500",
];

interface CityCardProps {
  city: City;
}

export default function CityCard({ city }: CityCardProps) {
  const gradientIndex =
    city.slug.split("").reduce((sum, c) => sum + c.charCodeAt(0), 0) %
    GRADIENT_MAP.length;
  const gradient = GRADIENT_MAP[gradientIndex];

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className={`relative h-40 bg-gradient-to-br ${gradient}`}>
        <div className="absolute bottom-3 left-3 text-white">
          <div className="text-lg font-bold">{city.name}</div>
          <div className="text-xs text-white/80">{city.region}</div>
        </div>
      </div>
      <CardContent className="p-4">
        <p className="text-sm text-gray-400">UI 준비 중 (Phase 3)</p>
      </CardContent>
    </Card>
  );
}
```

---

### Task 2-3: TopCitiesSection showRank 제거

**파일:** `src/components/home/TopCitiesSection.tsx`

`showRank` prop은 삭제된 `rank` 필드에 의존하므로 제거.

- [x] **Step 2-3.1** `<CityCard key={city.slug} city={city} showRank />` → `<CityCard key={city.slug} city={city} />`

---

### Task 2-4: Phase 2 lint + typecheck

- [x] **Step 2-4.1** typecheck 실행

```bash
cd nomad-korea && npx tsc --noEmit
```

예상 결과: 오류 0 (City 타입 변경에 따른 참조 오류 없어야 함)

- [x] **Step 2-4.2** lint 실행

```bash
npm run lint
```

예상 결과: 오류 0

---

## ─── Phase 3: 카드 UI 개편 ───

### Task 3-1: CityCard 전면 재설계

**파일:** `src/components/cities/CityCard.tsx`

- [x] **Step 3-1.1** `CityCard.tsx` 전체를 아래 내용으로 교체

```tsx
"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { City } from "@/lib/mock-data";

const GRADIENT_MAP = [
  "from-blue-400 to-cyan-500",
  "from-emerald-400 to-teal-500",
  "from-orange-400 to-amber-500",
  "from-purple-400 to-pink-500",
  "from-rose-400 to-red-500",
  "from-indigo-400 to-blue-500",
  "from-yellow-400 to-orange-500",
  "from-teal-400 to-green-500",
];

const BUDGET_LABEL: Record<string, string> = {
  under100: "100만원 이하",
  "100to200": "100~200만원",
  over200: "200만원 이상",
};

const SEASON_EMOJI: Record<string, string> = {
  봄: "🌸",
  여름: "☀️",
  가을: "🍂",
  겨울: "❄️",
};

interface CityCardProps {
  city: City;
}

export default function CityCard({ city }: CityCardProps) {
  const [reaction, setReaction] = useState<"like" | "dislike" | null>(null);

  const likeCount = city.likes + (reaction === "like" ? 1 : 0);
  const dislikeCount = city.dislikes + (reaction === "dislike" ? 1 : 0);

  const handleLike = () => setReaction(reaction === "like" ? null : "like");
  const handleDislike = () => setReaction(reaction === "dislike" ? null : "dislike");

  const gradientIndex =
    city.slug.split("").reduce((sum, c) => sum + c.charCodeAt(0), 0) %
    GRADIENT_MAP.length;
  const gradient = GRADIENT_MAP[gradientIndex];

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className={`relative h-40 bg-gradient-to-br ${gradient}`}>
        <div className="absolute bottom-3 left-3 text-white">
          <div className="text-lg font-bold">{city.name}</div>
          <div className="text-xs text-white/80">{city.region}</div>
        </div>
      </div>

      <CardContent className="p-4">
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500">예산</dt>
            <dd className="font-medium text-gray-800">{BUDGET_LABEL[city.budget]}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">지역</dt>
            <dd className="font-medium text-gray-800">{city.regionFilter}</dd>
          </div>
          <div className="flex items-start justify-between gap-4">
            <dt className="shrink-0 text-gray-500">환경</dt>
            <dd className="flex flex-wrap justify-end gap-1">
              {city.environment.map((env) => (
                <Badge key={env} variant="secondary" className="text-xs">
                  {env}
                </Badge>
              ))}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">최고 계절</dt>
            <dd className="font-medium text-gray-800">
              {SEASON_EMOJI[city.bestSeason]} {city.bestSeason}
            </dd>
          </div>
        </dl>

        <div className="mt-3 flex gap-4 border-t pt-3">
          <button
            onClick={handleLike}
            className="flex items-center gap-1 text-sm"
            aria-label="좋아요"
          >
            <ThumbsUp
              className={`h-4 w-4 ${reaction === "like" ? "text-indigo-600" : "text-gray-400"}`}
            />
            <span>{likeCount}</span>
          </button>
          <button
            onClick={handleDislike}
            className="flex items-center gap-1 text-sm"
            aria-label="싫어요"
          >
            <ThumbsDown
              className={`h-4 w-4 ${reaction === "dislike" ? "text-red-500" : "text-gray-400"}`}
            />
            <span>{dislikeCount}</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
```

---

### Task 3-2: Phase 3 lint + typecheck

- [x] **Step 3-2.1** typecheck 실행

```bash
cd nomad-korea && npx tsc --noEmit
```

- [x] **Step 3-2.2** lint 실행

```bash
npm run lint
```

---

## ─── Phase 4: 필터 시스템 구축 ───

### Task 4-1: FilterBar 4개 필터로 교체

**파일:** `src/components/cities/FilterBar.tsx`

`FilterState` 타입을 여기서 export — CityListSection이 import해서 사용.

- [x] **Step 4-1.1** `FilterBar.tsx` 전체를 아래 내용으로 교체

```tsx
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface FilterState {
  budget: string;
  regionFilter: string;
  environment: string;
  bestSeason: string;
}

interface FilterBarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export default function FilterBar({ filters, onFiltersChange }: FilterBarProps) {
  const set = (key: keyof FilterState) => (value: string) =>
    onFiltersChange({ ...filters, [key]: value });

  return (
    <div className="mb-6 flex flex-wrap gap-3 rounded-xl border bg-white p-4 shadow-sm">
      <Select value={filters.budget} onValueChange={set("budget")}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="예산" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">전체</SelectItem>
          <SelectItem value="under100">100만원 이하</SelectItem>
          <SelectItem value="100to200">100~200만원</SelectItem>
          <SelectItem value="over200">200만원 이상</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.regionFilter} onValueChange={set("regionFilter")}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="지역" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">전체</SelectItem>
          <SelectItem value="수도권">수도권</SelectItem>
          <SelectItem value="경상도">경상도</SelectItem>
          <SelectItem value="전라도">전라도</SelectItem>
          <SelectItem value="강원도">강원도</SelectItem>
          <SelectItem value="제주도">제주도</SelectItem>
          <SelectItem value="충청도">충청도</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.environment} onValueChange={set("environment")}>
        <SelectTrigger className="w-44">
          <SelectValue placeholder="환경" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">전체</SelectItem>
          <SelectItem value="자연친화">자연친화</SelectItem>
          <SelectItem value="도심선호">도심선호</SelectItem>
          <SelectItem value="카페작업">카페작업</SelectItem>
          <SelectItem value="코워킹 필수">코워킹 필수</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.bestSeason} onValueChange={set("bestSeason")}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="최고 계절" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">전체</SelectItem>
          <SelectItem value="봄">봄</SelectItem>
          <SelectItem value="여름">여름</SelectItem>
          <SelectItem value="가을">가을</SelectItem>
          <SelectItem value="겨울">겨울</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
```

---

### Task 4-2: CityGrid — cities prop 수신으로 변경

**파일:** `src/components/cities/CityGrid.tsx`

필터링/정렬은 CityListSection에서 하므로, CityGrid는 받은 cities를 렌더링만 함.

- [x] **Step 4-2.1** `CityGrid.tsx` 전체를 아래 내용으로 교체

```tsx
import CityCard from "@/components/cities/CityCard";
import { City } from "@/lib/mock-data";

interface CityGridProps {
  cities: City[];
}

export default function CityGrid({ cities }: CityGridProps) {
  if (cities.length === 0) {
    return (
      <p className="py-12 text-center text-gray-500">
        조건에 맞는 도시가 없습니다
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cities.map((city) => (
        <CityCard key={city.slug} city={city} />
      ))}
    </div>
  );
}
```

---

### Task 4-3: CityListSection 신규 생성

**파일:** `src/components/cities/CityListSection.tsx` (신규)

필터 상태를 보유하는 Client 래퍼. 필터링·정렬 로직의 단일 책임.

- [x] **Step 4-3.1** `src/components/cities/CityListSection.tsx` 파일 생성

```tsx
"use client";

import { useState } from "react";
import { MOCK_CITIES } from "@/lib/mock-data";
import FilterBar, { FilterState } from "@/components/cities/FilterBar";
import CityGrid from "@/components/cities/CityGrid";

const INITIAL_FILTERS: FilterState = {
  budget: "all",
  regionFilter: "all",
  environment: "all",
  bestSeason: "all",
};

export default function CityListSection() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  const cities = MOCK_CITIES.filter(
    (city) => filters.budget === "all" || city.budget === filters.budget,
  )
    .filter(
      (city) =>
        filters.regionFilter === "all" ||
        city.regionFilter === filters.regionFilter,
    )
    .filter(
      (city) =>
        filters.environment === "all" ||
        city.environment.includes(filters.environment),
    )
    .filter(
      (city) =>
        filters.bestSeason === "all" || city.bestSeason === filters.bestSeason,
    )
    .sort((a, b) => b.likes - a.likes);

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            도시 리스트
          </h2>
        </div>
        <FilterBar filters={filters} onFiltersChange={setFilters} />
        <CityGrid cities={cities} />
      </div>
    </section>
  );
}
```

---

### Task 4-4: page.tsx 업데이트

**파일:** `src/app/page.tsx`

TopCitiesSection + CityGrid 섹션을 CityListSection 하나로 교체.

- [x] **Step 4-4.1** `page.tsx` 전체를 아래 내용으로 교체

```tsx
import HeroSection from "@/components/home/HeroSection";
import CityListSection from "@/components/cities/CityListSection";
import RecentReviewsSection from "@/components/home/RecentReviewsSection";
import SeasonalRecommendations from "@/components/home/SeasonalRecommendations";
import CtaBanner from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CityListSection />
      <RecentReviewsSection />
      <SeasonalRecommendations />
      <CtaBanner />
    </>
  );
}
```

---

### Task 4-5: Phase 4 최종 검증

- [x] **Step 4-5.1** typecheck

```bash
cd nomad-korea && npx tsc --noEmit
```

- [x] **Step 4-5.2** lint

```bash
npm run lint
```

- [x] **Step 4-5.3** build

```bash
npm run build
```

예상 빌드 결과:
```
Route (app)
├ ƒ /
├ ƒ /_not-found
├ ƒ /auth/callback
├ ƒ /login
└ ƒ /register
```

- [x] **Step 4-5.4** 검증 항목 (dev 서버 또는 빌드 결과 기준)
  - 홈 페이지 상단 섹션 제목이 "도시 리스트"
  - 필터 전체 선택 시 8개 도시, likes 내림차순 (부산 312 → 제주 234 → 강릉 187 순)
  - 예산 "100만원 이하" 선택 시 경주·전주만 표시
  - 지역 "강원도" 선택 시 강릉·속초만 표시
  - 환경 "코워킹 필수" 선택 시 속초·전주만 표시
  - 최고 계절 "가을" 선택 시 부산·경주·통영만 표시
  - 두 필터 동시 적용 AND 조건 정상 동작
  - 결과 0개 시 "조건에 맞는 도시가 없습니다" 텍스트 표시
  - 카드에 별점·"자세히 보기" 없음, Key-Value 4행 + 좋아요/싫어요 버튼 존재
  - 좋아요 클릭 → indigo-600, 재클릭 → 회색 원복
  - 좋아요 활성 후 싫어요 클릭 → 좋아요 비활성, 싫어요 활성

---

## 현황

| Phase | 상태 |
|-------|------|
| Phase 2: 데이터 모델 | ✅ 완료 |
| Phase 3: 카드 UI | ✅ 완료 |
| Phase 4: 필터 시스템 | ✅ 완료 |
