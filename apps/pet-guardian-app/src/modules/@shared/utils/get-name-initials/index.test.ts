import { describe, it, expect } from 'vitest'

import { getNameInitials } from './index'

describe('getNameInitials', () => {
  it('should return the first letter capitalized for a single name', () => {
    expect(getNameInitials('matheus')).toBe('M')
    expect(getNameInitials(' Ana ')).toBe('A')
  })

  it('should return initials of first and last name', () => {
    expect(getNameInitials('matheus fernandes')).toBe('MF')
    expect(getNameInitials('Ana Maria')).toBe('AM')
  })

  it('should return initials of first and last part for multiple names', () => {
    expect(getNameInitials('matheus pedro fernandes')).toBe('MF')
    expect(getNameInitials('Ana Maria Silva')).toBe('AS')
  })

  it('should handle extra spaces between names', () => {
    expect(getNameInitials('  matheus   fernandes  ')).toBe('MF')
    expect(getNameInitials(' Ana   Maria  Silva ')).toBe('AS')
  })

  it('should return empty string for empty input', () => {
    expect(getNameInitials('')).toBe('')
    expect(getNameInitials('   ')).toBe('')
  })
})
