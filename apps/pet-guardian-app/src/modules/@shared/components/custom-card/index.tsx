import { HTMLAttributes, PropsWithChildren } from 'react'

import { cn } from '../../utils'

export const CustomCard = ({
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div
      {...props}
      className={cn(
        'w-auto p-4 shadow-md rounded-lg bg-background',
        props.className
      )}
    >
      {children}
    </div>
  )
}
