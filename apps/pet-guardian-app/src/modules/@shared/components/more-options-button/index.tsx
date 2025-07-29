import { PropsWithChildren } from 'react'

import { Ellipsis } from 'lucide-react'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger
} from '../ui'

export const MoreOptionsMenu = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <DropdownMenu
      onOpenChange={() => {
        setTimeout(() => (document.body.style.pointerEvents = ''), 100)
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Ellipsis className="text-tertiary size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>{children}</DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
