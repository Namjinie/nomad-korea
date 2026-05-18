import { vi } from 'vitest'
import { mapDbCity, getCities, getUserReactions, DbCity } from '@/lib/supabase/queries'

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn()
}))

import { createClient } from '@/lib/supabase/server'

const mockCreateClient = createClient as ReturnType<typeof vi.fn>

// 테스트에 사용할 기본 DbCity 픽스처
const baseDbCity: DbCity = {
  slug: 'jeju',
  name: '제주시',
  region: '제주특별자치도',
  budget: '100to200',
  region_filter: '제주도',
  environment: ['자연친화', '카페작업'],
  best_season: '봄',
  likes: 234,
  dislikes: 12,
}

// ─────────────────────────────────────────
// Group 1: mapDbCity (no mocking)
// ─────────────────────────────────────────
describe('mapDbCity', () => {
  it('Q-01: snake_case → camelCase 매핑', () => {
    const db: DbCity = {
      ...baseDbCity,
      region_filter: '강원도',
      best_season: '여름',
    }
    const city = mapDbCity(db)
    expect(city.regionFilter).toBe('강원도')
    expect(city.bestSeason).toBe('여름')
  })

  it('Q-02: environment 배열 유지', () => {
    const db: DbCity = {
      ...baseDbCity,
      environment: ['자연친화', '카페작업'],
    }
    const city = mapDbCity(db)
    expect(city.environment).toEqual(['자연친화', '카페작업'])
  })

  it('Q-03: 모든 필드 올바른 매핑', () => {
    const city = mapDbCity(baseDbCity)
    expect(city.slug).toBe('jeju')
    expect(city.name).toBe('제주시')
    expect(city.region).toBe('제주특별자치도')
    expect(city.budget).toBe('100to200')
    expect(city.regionFilter).toBe('제주도')
    expect(city.environment).toEqual(['자연친화', '카페작업'])
    expect(city.bestSeason).toBe('봄')
    expect(city.likes).toBe(234)
    expect(city.dislikes).toBe(12)
  })
})

// ─────────────────────────────────────────
// Group 2: getCities
// ─────────────────────────────────────────
describe('getCities', () => {
  it('Q-04: 정상 응답 시 City[] 반환', async () => {
    const orderMock = vi.fn().mockResolvedValue({ data: [baseDbCity], error: null })
    mockCreateClient.mockResolvedValue({
      from: () => ({
        select: () => ({
          order: orderMock,
        }),
      }),
    })

    const result = await getCities()
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('jeju')
  })

  it('Q-05: error 발생 시 빈 배열 반환', async () => {
    const orderMock = vi.fn().mockResolvedValue({ data: null, error: { message: 'DB error' } })
    mockCreateClient.mockResolvedValue({
      from: () => ({
        select: () => ({
          order: orderMock,
        }),
      }),
    })

    const result = await getCities()
    expect(result).toEqual([])
  })

  it('Q-06: data가 null일 때 빈 배열 반환', async () => {
    const orderMock = vi.fn().mockResolvedValue({ data: null, error: null })
    mockCreateClient.mockResolvedValue({
      from: () => ({
        select: () => ({
          order: orderMock,
        }),
      }),
    })

    const result = await getCities()
    expect(result).toEqual([])
  })

  it('Q-07: order 호출 확인', async () => {
    const orderMock = vi.fn().mockResolvedValue({ data: [], error: null })
    mockCreateClient.mockResolvedValue({
      from: () => ({
        select: () => ({
          order: orderMock,
        }),
      }),
    })

    await getCities()
    expect(orderMock).toHaveBeenCalledWith('likes', { ascending: false })
  })
})

// ─────────────────────────────────────────
// Group 3: getUserReactions
// ─────────────────────────────────────────
describe('getUserReactions', () => {
  it('Q-08: 정상 응답 → Record 변환', async () => {
    const eqMock = vi.fn().mockResolvedValue({
      data: [{ city_slug: 'jeju', reaction: 'like' }],
      error: null,
    })
    mockCreateClient.mockResolvedValue({
      from: () => ({
        select: () => ({
          eq: eqMock,
        }),
      }),
    })

    const result = await getUserReactions('user-1')
    expect(result).toEqual({ jeju: 'like' })
  })

  it('Q-09: 복수 반응 올바른 매핑', async () => {
    const eqMock = vi.fn().mockResolvedValue({
      data: [
        { city_slug: 'jeju', reaction: 'like' },
        { city_slug: 'busan', reaction: 'dislike' },
      ],
      error: null,
    })
    mockCreateClient.mockResolvedValue({
      from: () => ({
        select: () => ({
          eq: eqMock,
        }),
      }),
    })

    const result = await getUserReactions('user-1')
    expect(result).toEqual({ jeju: 'like', busan: 'dislike' })
  })

  it('Q-10: error 발생 시 빈 객체 반환', async () => {
    const eqMock = vi.fn().mockResolvedValue({ data: null, error: { message: 'DB error' } })
    mockCreateClient.mockResolvedValue({
      from: () => ({
        select: () => ({
          eq: eqMock,
        }),
      }),
    })

    const result = await getUserReactions('user-1')
    expect(result).toEqual({})
  })

  it('Q-11: data가 null일 때 빈 객체 반환', async () => {
    const eqMock = vi.fn().mockResolvedValue({ data: null, error: null })
    mockCreateClient.mockResolvedValue({
      from: () => ({
        select: () => ({
          eq: eqMock,
        }),
      }),
    })

    const result = await getUserReactions('user-1')
    expect(result).toEqual({})
  })
})
