import { test, expect } from '@playwright/test'

test('should sign in successfully with valid credentials', async ({ page }) => {
  await page.goto('/auth/sign-in')

  expect(page).toHaveURL(/.*sign-in/)

  await page.getByTestId('email').fill('johndoe@example.com')
  await page.getByTestId('password').fill('password')

  await page.getByTestId('submit-sign-in').click()
  await expect(page.getByTestId('loading-button')).toBeVisible()

  const toast = page.getByText('Sucesso!')

  expect(toast).toBeVisible()

  expect(page).toHaveURL('meus-pets')

  await page.waitForTimeout(2000)
})

test('should show error with wrong credentials', async ({ page }) => {
  await page.goto('/auth/sign-in')

  await expect(page).toHaveURL(/.*sign-in/)

  await page.getByTestId('email').fill('johndoe@example.com')
  await page.getByTestId('password').fill('wrongpassword')

  await page.getByTestId('submit-sign-in').click()
  const toast = page.getByText('Erro!')

  await expect(page.getByTestId('loading-button')).toBeVisible()

  expect(toast).toBeVisible()

  await page.waitForTimeout(2000)
})
