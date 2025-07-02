import { describe, it, expect } from 'vitest'

import { formatToMonetaryValue } from './index'

describe('formatToMonetaryValue', () => {
  function extractMonetaryParts(str: string) {
    return str.replace(/\s|\u00A0/g, ' ')
  }

  it('should return "R$ 0" for 0', () => {
    expect(extractMonetaryParts(formatToMonetaryValue(0))).toBe('R$ 0')
  })

  it('should return "R$ 0" for null', () => {
    expect(
      extractMonetaryParts(formatToMonetaryValue(null as unknown as number))
    ).toBe('R$ 0')
  })

  it('should format positive numbers correctly', () => {
    expect(extractMonetaryParts(formatToMonetaryValue(1234.56))).toBe(
      'R$ 1.234,56'
    )
  })

  it('should format negative numbers correctly', () => {
    expect(extractMonetaryParts(formatToMonetaryValue(-1234.56))).toBe(
      'R$ - 1.234,56'
    )
  })

  it('should format string numbers correctly', () => {
    expect(extractMonetaryParts(formatToMonetaryValue('789.01'))).toBe(
      'R$ 789,01'
    )
  })

  it('should format string negative numbers correctly', () => {
    expect(extractMonetaryParts(formatToMonetaryValue('-789.01'))).toBe(
      'R$ - 789,01'
    )
  })

  it('should format integer values', () => {
    expect(extractMonetaryParts(formatToMonetaryValue(1000))).toBe(
      'R$ 1.000,00'
    )
  })
})
