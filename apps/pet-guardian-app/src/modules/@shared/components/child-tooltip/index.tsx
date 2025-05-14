import { PropsWithChildren, ReactNode } from 'react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui'

interface ChildTooltipProps {
  content: string | ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
}

export const ChildTooltip = (props: PropsWithChildren<ChildTooltipProps>) => {
  const { children, content, side } = props
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
