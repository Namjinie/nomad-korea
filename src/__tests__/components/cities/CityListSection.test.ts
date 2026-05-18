import { describe, it, expect } from 'vitest';
import { filterCities } from '@/components/cities/CityListSection';
import { MOCK_CITIES } from '@/lib/mock-data';

const ALL_FILTERS = {
  budget: 'all',
  regionFilter: 'all',
  environment: 'all',
  bestSeason: 'all',
};

describe('filterCities', () => {
  it('F-01: 전체 필터 "all" → 8개 모두 반환', () => {
    const result = filterCities(MOCK_CITIES, ALL_FILTERS);
    expect(result).toHaveLength(8);
  });

  it('F-02: budget = "under100" → 경주, 전주 (2개)', () => {
    const result = filterCities(MOCK_CITIES, { ...ALL_FILTERS, budget: 'under100' });
    expect(result).toHaveLength(2);
    expect(result.map((c) => c.name)).toEqual(expect.arrayContaining(['경주', '전주']));
  });

  it('F-03: budget = "100to200" → 6개 반환', () => {
    const result = filterCities(MOCK_CITIES, { ...ALL_FILTERS, budget: '100to200' });
    expect(result).toHaveLength(6);
  });

  it('F-04: regionFilter = "강원도" → 강릉, 속초 (2개)', () => {
    const result = filterCities(MOCK_CITIES, { ...ALL_FILTERS, regionFilter: '강원도' });
    expect(result).toHaveLength(2);
    expect(result.map((c) => c.name)).toEqual(expect.arrayContaining(['강릉', '속초']));
  });

  it('F-05: regionFilter = "제주도" → 제주시 (1개)', () => {
    const result = filterCities(MOCK_CITIES, { ...ALL_FILTERS, regionFilter: '제주도' });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('제주시');
  });

  it('F-06: environment = "자연친화" → 6개 반환', () => {
    const result = filterCities(MOCK_CITIES, { ...ALL_FILTERS, environment: '자연친화' });
    expect(result).toHaveLength(6);
    expect(result.map((c) => c.name)).toEqual(
      expect.arrayContaining(['제주시', '강릉', '경주', '여수', '속초', '통영'])
    );
  });

  it('F-07: environment = "코워킹 필수" → 속초, 전주 (2개)', () => {
    const result = filterCities(MOCK_CITIES, { ...ALL_FILTERS, environment: '코워킹 필수' });
    expect(result).toHaveLength(2);
    expect(result.map((c) => c.name)).toEqual(expect.arrayContaining(['속초', '전주']));
  });

  it('F-08: bestSeason = "봄" → 제주시, 경주, 전주 (3개)', () => {
    const result = filterCities(MOCK_CITIES, { ...ALL_FILTERS, bestSeason: '봄' });
    expect(result).toHaveLength(3);
    expect(result.map((c) => c.name)).toEqual(
      expect.arrayContaining(['제주시', '경주', '전주'])
    );
  });

  it('F-09: bestSeason = "겨울" → 빈 배열', () => {
    const result = filterCities(MOCK_CITIES, { ...ALL_FILTERS, bestSeason: '겨울' });
    expect(result).toHaveLength(0);
  });

  it('F-10: budget="under100" + regionFilter="경상도" → 경주 (1개)', () => {
    const result = filterCities(MOCK_CITIES, {
      ...ALL_FILTERS,
      budget: 'under100',
      regionFilter: '경상도',
    });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('경주');
  });

  it('F-11: regionFilter="강원도" + environment="자연친화" → 강릉, 속초 (2개)', () => {
    const result = filterCities(MOCK_CITIES, {
      ...ALL_FILTERS,
      regionFilter: '강원도',
      environment: '자연친화',
    });
    expect(result).toHaveLength(2);
    expect(result.map((c) => c.name)).toEqual(expect.arrayContaining(['강릉', '속초']));
  });

  it('F-12: budget="over200" → 빈 배열', () => {
    const result = filterCities(MOCK_CITIES, { ...ALL_FILTERS, budget: 'over200' });
    expect(result).toHaveLength(0);
  });

  it('F-13: 전체 필터 시 likes 내림차순 정렬 (첫번째=부산, 마지막=통영)', () => {
    const result = filterCities(MOCK_CITIES, ALL_FILTERS);
    expect(result[0].name).toBe('부산');
    expect(result[result.length - 1].name).toBe('통영');
  });

  it('F-14: 필터 후 정렬 유지 (강원도: 강릉 likes=187 → 속초 likes=89 순서)', () => {
    const result = filterCities(MOCK_CITIES, { ...ALL_FILTERS, regionFilter: '강원도' });
    expect(result[0].name).toBe('강릉');
    expect(result[1].name).toBe('속초');
  });
});
