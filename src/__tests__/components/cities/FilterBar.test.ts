import { describe, it, expect } from 'vitest';
import { applyFilterChange } from '@/components/cities/FilterBar';
import type { FilterState } from '@/components/cities/FilterBar';

const baseFilters: FilterState = {
  budget: 'all',
  regionFilter: 'all',
  environment: 'all',
  bestSeason: 'all',
};

describe('applyFilterChange', () => {
  it('B-01: budget 변경 → budget만 "under100"으로 갱신', () => {
    const result = applyFilterChange(baseFilters, 'budget', 'under100');
    expect(result).toEqual({ ...baseFilters, budget: 'under100' });
  });

  it('B-02: budget 변경 시 다른 key는 "all" 유지', () => {
    const result = applyFilterChange(baseFilters, 'budget', 'under100');
    expect(result.regionFilter).toBe('all');
    expect(result.environment).toBe('all');
    expect(result.bestSeason).toBe('all');
  });

  it('B-03: value = null → 기존 값 유지 (null ?? "all" = "all")', () => {
    const result = applyFilterChange(baseFilters, 'budget', null);
    expect(result).toEqual(baseFilters);
  });
});
