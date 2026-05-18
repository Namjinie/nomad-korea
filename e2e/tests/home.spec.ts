import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'

const TOTAL_CITIES = 8 // MOCK_CITIES 총 도시 수

test.describe('홈페이지', () => {
  test('H-01: 로고가 존재한다', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    await expect(page.getByRole('link', { name: '노마드코리아' })).toBeVisible()
  })

  test('H-02: 도시 카드 목록이 렌더링된다', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    const count = await home.getCityCardCount()
    expect(count).toBeGreaterThan(0)
  })

  test('H-03: 초기 접속 시 필터가 적용되지 않은 상태다', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    // 초기 필터는 모두 'all' 값 — SelectTrigger에 "all"이 표시됨
    const triggers = page.getByRole('combobox')
    const count = await triggers.count()
    for (let i = 0; i < count; i++) {
      await expect(triggers.nth(i)).toContainText('all')
    }
  })

  test('H-04: 필터 미적용 시 전체 도시가 카드로 나열된다', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    const count = await home.getCityCardCount()
    expect(count).toBe(TOTAL_CITIES)
  })

  test.fixme('H-05: 예산 필터 선택 시 해당 도시만 표시된다', async () => {})
  test.fixme('H-06: 지역 필터 선택 시 해당 도시만 표시된다', async () => {})
  test.fixme('H-07: 환경 필터 선택 시 해당 도시만 표시된다', async () => {})
  test.fixme('H-08: 계절 필터 선택 시 해당 도시만 표시된다', async () => {})
  test.fixme('H-09: 최근 리뷰 섹션이 보인다', async () => {})
  test.fixme('H-10: 계절별 추천 섹션이 보인다', async () => {})
})
