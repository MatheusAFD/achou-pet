import { PropsWithChildren, ReactNode } from 'react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui'

interface ChildTooltipProps {
  content: string | ReactNode
}

export const ChildTooltip = (props: PropsWithChildren<ChildTooltipProps>) => {
  const { children, content } = props
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
