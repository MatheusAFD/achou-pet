'use client'

import Link from 'next/link'

import { LogOut } from 'lucide-react'

import { useSession } from '../../hooks/use-session'
import { getNameInitials } from '../../utils'
import { Container } from '../container'
import { Avatar, AvatarFallback, buttonVariants, SidebarTrigger } from '../ui'

export const AppHeader = () => {
  const { session } = useSession()

  return (
    <header className="bg-background border-sidebar-border sticky top-0 z-10 flex h-[72px] w-full items-center justify-center border-b md:relative">
      <SidebarTrigger className="ml-3" />
      <Container className="flex w-full items-end">
        <div className="flex items-center gap-3 md:p-4">
          <Link
            href="/auth/sign-out"
            className={buttonVariants({ variant: 'outline' })}
            data-testid="sign-out-button"
          >
            <LogOut />
            Sair
          </Link>

          <Avatar className="outline-tertiary size-10 outline-2">
            <AvatarFallback>
              {getNameInitials(`${session?.name} ${session?.lastName}`)}
            </AvatarFallback>
          </Avatar>
        </div>
      </Container>
    </header>
  )
}
