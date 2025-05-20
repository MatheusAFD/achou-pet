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
        'w-auto p-4 shadow-md rounded-lg bg-background',
        props.className
      )}
    >
      {children}
    </Component>
  )
}
