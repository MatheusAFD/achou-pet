import React from 'react'

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Conditional } from './index'

import '@testing-library/jest-dom'

describe('Conditional', () => {
  it('should not render children when condition is false', () => {
    render(
      <Conditional condition={false}>
        <div data-testid="child">Should not render</div>
      </Conditional>
    )
    expect(screen.queryByTestId('child')).not.toBeInTheDocument()
  })

  it('should render children when condition is true', () => {
    render(
      <Conditional condition={true}>
        <div data-testid="child">Should render</div>
      </Conditional>
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
    expect(screen.getByTestId('child')).toHaveTextContent('Should render')
  })

  it('should add animate-fade-render class when withFadeRender is true', () => {
    render(
      <Conditional condition={true} withFadeRender>
        <div data-testid="child" className="custom-class">
          Fade
        </div>
      </Conditional>
    )
    const child = screen.getByTestId('child')
    expect(child).toHaveClass('animate-fade-render')
    expect(child).toHaveClass('custom-class')
  })

  it('should not add animate-fade-render class when withFadeRender is false', () => {
    render(
      <Conditional condition={true}>
        <div data-testid="child" className="custom-class">
          No Fade
        </div>
      </Conditional>
    )
    const child = screen.getByTestId('child')
    expect(child).not.toHaveClass('animate-fade-render')
    expect(child).toHaveClass('custom-class')
  })

  it('should handle non-element children gracefully', () => {
    render(
      <Conditional condition={true} withFadeRender>
        Text only
      </Conditional>
    )
    expect(screen.getByText('Text only')).toBeInTheDocument()
  })
})
