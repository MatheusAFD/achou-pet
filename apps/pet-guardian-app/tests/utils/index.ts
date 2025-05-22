import { BrowserContext } from '@playwright/test'

export async function getSessionCookie(context: BrowserContext) {
  const cookies = await context.cookies()

  return cookies.find((c: { name: string }) => c.name === 'achou-pet-token')
}
