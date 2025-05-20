import { PropsWithChildren } from 'react'

import {
  AppHeader,
  AppSidebar,
  SidebarProvider
} from '@admin/modules/@shared/components'
import { SessionProvider } from '@admin/modules/@shared/contexts/session-context'
import { getAuthToken } from '@admin/modules/@shared/utils'
import { getMe } from '@admin/modules/auth/services'

export default async function LayoutAdmin(props: PropsWithChildren) {
  const { children } = props

  const { tokenExpirationTime } = await getAuthToken()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, session] = await getMe()

  return (
    <SessionProvider
      session={session}
      tokenExpirationTime={tokenExpirationTime}
    >
      <SidebarProvider>
        <AppSidebar />
        <div className="flex-auto flex flex-col">
          <AppHeader />
          <main className="block">{children}</main>
        </div>
      </SidebarProvider>
    </SessionProvider>
  )
}
