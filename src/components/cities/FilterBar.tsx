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

export function applyFilterChange(
  filters: FilterState,
  key: keyof FilterState,
  value: string | null
): FilterState {
  return { ...filters, [key]: value ?? filters[key] };
}

interface FilterBarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export default function FilterBar({ filters, onFiltersChange }: FilterBarProps) {
  const set = (key: keyof FilterState) => (value: string | null) =>
    onFiltersChange(applyFilterChange(filters, key, value));

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
