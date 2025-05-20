'use client'

import * as React from 'react'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

import { twMerge } from 'tailwind-merge'

import { buttonVariants } from '../ui'

export interface NavItemProps extends LinkProps {
  className?: string
  children: React.ReactNode
}

export function NavItem({ className, ...props }: NavItemProps) {
  const pathname = usePathname()
  const isActive = pathname === props.href

  return (
    <Link
      className={buttonVariants({
        variant: isActive ? 'default' : 'ghost',
        size: 'lg',
        className: twMerge('flex justify-start', className)
      })}
      {...props}
    >
      {props.children}
    </Link>
  )
}

NavItem.displayName = 'NavItem'
