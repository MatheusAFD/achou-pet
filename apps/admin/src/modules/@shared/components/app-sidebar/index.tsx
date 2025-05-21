import Image from 'next/image'
import Link from 'next/link'

import { LogOut } from 'lucide-react'

import { sidebarMenuItems } from '../../constants/sidebar-menu-items'
import { NavItem } from '../nav-item'
import {
  buttonVariants,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu
} from '../ui'

export const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center gap-4 h-[72px] border-b border-sidebar-border">
        <Link href="/meus-pets">
          <Image
            src="/logo.png"
            width={64}
            height={64}
            quality={100}
            priority
            alt="Logo de um animal com a face metade gato e metade cachorro."
            className="mx-4"
          />
        </Link>

        <h1 className="text-sm text-primary font-semibold">
          Achou Pet | Admin
        </h1>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>

          <SidebarMenu className="gap-4">
            {sidebarMenuItems.map((item) => {
              return (
                <NavItem key={item.path} href={item.path} as={item.as}>
                  <item.icon size={20} />
                  {item.label}
                </NavItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mb-8">
        <Link
          href="/auth-logout"
          className={buttonVariants({ variant: 'outline' })}
        >
          <LogOut />
          Sair
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
