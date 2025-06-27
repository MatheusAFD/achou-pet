import test, { expect } from '@playwright/test'

import { signedInTest } from '../fixtures'
import { getSessionCookie } from '../utils'

signedInTest('should sign-out in successfully ', async ({ page, context }) => {
  await page.getByTestId('sign-out-button').first().click()

  await expect(page).toHaveURL('/auth/sign-in')

  await page.waitForTimeout(2000)

  const sessionCookie = await getSessionCookie(context)
  expect(sessionCookie).toBeUndefined()
})

test('should be redirected in protected routes when signed out.', async ({
  page,
  context
}) => {
  await page.goto('/meus-pets')

  await page.waitForTimeout(2000)

  const sessionCookie = await getSessionCookie(context)
  expect(sessionCookie).toBeUndefined()

  await expect(page).toHaveURL('/auth/sign-in')
})
