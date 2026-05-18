import { Page, Locator } from '@playwright/test'

export class HomePage {
  readonly page: Page

  // 섹션
  readonly heroSection: Locator
  readonly cityListSection: Locator
  readonly reviewsSection: Locator
  readonly seasonalSection: Locator

  // 히어로
  readonly heroHeading: Locator

  // 필터
  readonly filterBudget: Locator
  readonly filterRegion: Locator
  readonly filterEnvironment: Locator
  readonly filterSeason: Locator

  constructor(page: Page) {
    this.page = page

    this.heroSection = page.locator('section').first()
    this.heroHeading = page.getByRole('heading', { name: '한국의 노마드 성지를' })
    this.cityListSection = page.getByRole('heading', { name: '도시 리스트' }).locator('../..')
    this.reviewsSection = page.getByRole('heading', { name: '노마드 후기' }).locator('../..')
    this.seasonalSection = page.getByRole('heading', { name: '계절별 추천' }).locator('../..')

    // 필터 컨테이너 내 combobox 순서: 예산(0), 지역(1), 환경(2), 계절(3)
    const filterContainer = page.locator('div').filter({ has: page.getByRole('combobox').first() }).first()
    this.filterBudget = filterContainer.getByRole('combobox').nth(0)
    this.filterRegion = filterContainer.getByRole('combobox').nth(1)
    this.filterEnvironment = filterContainer.getByRole('combobox').nth(2)
    this.filterSeason = filterContainer.getByRole('combobox').nth(3)
  }

  async goto() {
    await this.page.goto('/')
  }

  async getCityCards(): Promise<Locator> {
    return this.page.locator('[aria-label="좋아요"]').locator('../../../..')
  }

  async getCityCardCount(): Promise<number> {
    return this.page.locator('[aria-label="좋아요"]').count()
  }

  async selectBudget(value: string) {
    await this.filterBudget.click()
    await this.page.getByRole('option', { name: value }).click()
  }

  async selectRegion(value: string) {
    await this.filterRegion.click()
    await this.page.getByRole('option', { name: value }).click()
  }

  async selectEnvironment(value: string) {
    await this.filterEnvironment.click()
    await this.page.getByRole('option', { name: value }).click()
  }

  async selectSeason(value: string) {
    await this.filterSeason.click()
    await this.page.getByRole('option', { name: value }).click()
  }

  async getLikeCount(nth: number): Promise<number> {
    const btn = this.page.getByRole('button', { name: '좋아요' }).nth(nth)
    const text = await btn.locator('span').innerText()
    return parseInt(text, 10)
  }

  async clickLike(nth: number) {
    await this.page.getByRole('button', { name: '좋아요' }).nth(nth).click()
  }

  async clickDislike(nth: number) {
    await this.page.getByRole('button', { name: '싫어요' }).nth(nth).click()
  }

  async getDislikeCount(nth: number): Promise<number> {
    const btn = this.page.getByRole('button', { name: '싫어요' }).nth(nth)
    const text = await btn.locator('span').innerText()
    return parseInt(text, 10)
  }
}
