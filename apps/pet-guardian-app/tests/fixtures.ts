import { test as base, expect } from '@playwright/test'

export const signedInTest = base.extend<{ forEachTest: void }>({
  forEachTest: [
    async ({ page }, use) => {
      await page.goto('/auth/sign-in')

      await page.getByTestId('email').fill('johndoe@example.com')
      await page.getByTestId('password').fill('password')

      await page.getByTestId('submit-sign-in').click()

      await expect(page).toHaveURL(/meus-pets/)

      await use()
    },
    { auto: true }
  ]
})
