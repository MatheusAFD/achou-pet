'use client'

import { useSession } from '../../hooks/use-session'
import { getNameInitials } from '../../utils'
import { Container } from '../container'
import { Avatar, AvatarFallback, SidebarTrigger } from '../ui'

export const AppHeader = () => {
  const { session } = useSession()

  return (
    <header className="w-full sticky top-0 z-10 md:relative bg-background flex justify-center items-center h-[72px] border-b border-sidebar-border">
      <SidebarTrigger className="pl-7" />
      <Container className="w-full flex items-end">
        <div className="flex items-center gap-3 md:p-4">
          <Avatar className="size-10 outline-2 outline-tertiary">
            <AvatarFallback>
              {getNameInitials(`${session?.name} ${session?.lastName}`)}
            </AvatarFallback>
          </Avatar>
        </div>
      </Container>
    </header>
  )
}
