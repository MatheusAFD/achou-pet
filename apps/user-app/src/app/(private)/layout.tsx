import {
  AppHeader,
  AppSidebar,
  SidebarProvider
} from '@user-app/modules/@shared/components'

export default function PrivateLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex-auto flex flex-col">
          <AppHeader />
          <main className="block">{children}</main>
        </div>
      </SidebarProvider>
    </>
  )
}
