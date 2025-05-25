export const generateMockJwtToken = (): string => {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  }
  const now = Math.floor(Date.now() / 1000)
  const payload = {
    id: '01JV2VWPMYMPKAAT6YZ8ZNVJK2',
    role: 'ADMIN',
    iat: now,
    exp: now + 3600
  }
  function base64url(obj: object): string {
    return Buffer.from(JSON.stringify(obj))
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
  }
  const encodedHeader = base64url(header)
  const encodedPayload = base64url(payload)

  const signature = 'mockedsignature'
  return `${encodedHeader}.${encodedPayload}.${signature}`
}
