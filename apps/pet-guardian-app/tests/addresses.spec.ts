import { signedInTest } from './fixtures'

signedInTest('', async ({ page }) => {
  await page.goto('/meus-enderecos')
})
