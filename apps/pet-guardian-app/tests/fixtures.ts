import { test as base } from '@playwright/test'

export const signedInTest = base.extend<{ forEachTest: void }>({
  forEachTest: [
    async ({ page }) => {
      await page.goto('/auth/sign-in')

      await page.getByTestId('email').fill('johndoe@example.com')
      await page.getByTestId('password').fill('password')

      await page.getByTestId('submit-sign-in').click()

      await page.waitForTimeout(2000)
    },
    { auto: true }
  ]
})
