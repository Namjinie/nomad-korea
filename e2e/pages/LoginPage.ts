import { Page, Locator } from '@playwright/test'

export class LoginPage {
  readonly page: Page

  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly errorMessage: Locator
  readonly registerLink: Locator

  constructor(page: Page) {
    this.page = page

    this.emailInput = page.locator('input[name="email"]')
    this.passwordInput = page.locator('input[name="password"]')
    this.submitButton = page.getByRole('button', { name: '로그인' })
    this.errorMessage = page.locator('.text-red-600')
    this.registerLink = page.getByRole('link', { name: '회원가입' })
  }

  async goto() {
    await this.page.goto('/login')
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.submitButton.click()
  }
}
