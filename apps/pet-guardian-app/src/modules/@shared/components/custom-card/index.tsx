import React, { HTMLAttributes, PropsWithChildren } from 'react'

import { cn } from '../../utils'

interface CustomCardProps extends HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
}

export const CustomCard = ({
  children,
  as: Component = 'div',
  ...props
}: PropsWithChildren<CustomCardProps>) => {
  return (
    <Component
      {...props}
      className={cn(
        'bg-background w-auto rounded-lg p-4 shadow-md',
        props.className
      )}
    >
      {children}
    </Component>
  )
}
