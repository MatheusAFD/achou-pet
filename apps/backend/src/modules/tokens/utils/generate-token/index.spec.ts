import { generateSixDigitToken } from './index'

describe('generateSixDigitToken', () => {
  it('should generate a 6-digit numeric token', () => {
    const token = generateSixDigitToken()

    expect(token).toHaveLength(6)
    expect(token).toMatch(/^\d{6}$/)
  })

  it('should generate different tokens on consecutive calls', () => {
    const firstToken = generateSixDigitToken()
    const secondToken = generateSixDigitToken()

    expect(firstToken).not.toBe(secondToken)
  })
})
