import { expect } from '@playwright/test'

import { signedInTest } from '../fixtures'
import { address } from '../mocks/addresses'

signedInTest('should to create a new address', async ({ page }) => {
  await page.goto('/meus-enderecos')

  expect(page).toHaveURL(/meus-enderecos/)

  const loadingSkeleton = page.getByTestId('addresses-list-skeleton')

  await expect(loadingSkeleton).not.toBeVisible()

  await page.getByTestId('create-address').click()

  const modal = page.getByTestId('create-address-modal').first()

  await expect(modal).toBeVisible()

  page.getByTestId('zipCode').fill(address.zipCode)

  const addressStreet = page.getByTestId('address')
  const neighborhood = page.getByTestId('neighborhood')
  const city = page.getByTestId('city')
  const state = page.getByTestId('state')

  await expect(addressStreet).toHaveValue(address.address)
  await expect(neighborhood).toHaveValue(address.neighborhood)
  await expect(city).toHaveValue(address.city)
  await expect(state).toHaveValue(address.state)

  const submitButton = page.getByTestId('submit-button')

  await page.getByTestId('number').fill('123')
  await page.getByTestId('reference').fill('Próximo ao parque')

  await submitButton.click()

  await expect(modal).not.toBeVisible()

  await expect(page.getByText('Sucesso!').first()).toBeVisible()
})
