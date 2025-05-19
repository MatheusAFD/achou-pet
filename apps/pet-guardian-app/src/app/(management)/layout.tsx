import {
  AppHeader,
  AppSidebar,
  SidebarProvider
} from '@user-app/modules/@shared/components'
import { SessionProvider } from '@user-app/modules/@shared/contexts/session-context'
import { getAuthToken } from '@user-app/modules/@shared/utils'
import { getMe } from '@user-app/modules/auth/services'

export default async function PrivateLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { tokenExpirationTime } = await getAuthToken()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, session] = await getMe()

  console.log('session', session)

  return (
    <>
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
    </>
  )
}
