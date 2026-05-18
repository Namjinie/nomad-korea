import { Page, Locator } from '@playwright/test'

export class RegisterPage {
  readonly page: Page

  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly errorMessage: Locator
  readonly loginLink: Locator
  readonly checkEmailMessage: Locator

  constructor(page: Page) {
    this.page = page

    this.emailInput = page.locator('input[name="email"]')
    this.passwordInput = page.locator('input[name="password"]')
    this.submitButton = page.getByRole('button', { name: '회원가입' })
    this.errorMessage = page.locator('.text-red-600')
    this.loginLink = page.getByRole('link', { name: '로그인' })
    this.checkEmailMessage = page.getByText('메일함을 확인하세요')
  }

  async goto() {
    await this.page.goto('/register')
  }

  async register(email: string, password: string) {
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.submitButton.click()
  }
}
