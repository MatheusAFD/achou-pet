import { expect } from '@playwright/test'

import { address } from '../../src/mocks/addresses/addresses-store'
import { signedInTest } from '../fixtures'

signedInTest('should require mandatory fields', async ({ page }) => {
  await page.goto('/meus-enderecos')
  await expect(page).toHaveURL(/meus-enderecos/)

  await page.getByTestId('create-address').click()

  const modal = page.getByTestId('create-address-modal')
  await expect(modal).toBeVisible()

  await page.getByTestId('zipCode').fill(address.zipCode)

  const addressStreet = page.getByTestId('address')
  const neighborhood = page.getByTestId('neighborhood')
  const city = page.getByTestId('city')
  const state = page.getByTestId('state')

  await expect(addressStreet).toHaveValue(address.address)
  await expect(neighborhood).toHaveValue(address.neighborhood)
  await expect(city).toHaveValue(address.city)
  await expect(state).toHaveValue(address.state)

  const submitButton = page.getByTestId('submit-button')
  await expect(submitButton).toBeDisabled()

  await page.getByTestId('number').fill('123')
  await page.getByTestId('reference').fill('Próximo ao parque')

  await expect(submitButton).toBeEnabled()
})
