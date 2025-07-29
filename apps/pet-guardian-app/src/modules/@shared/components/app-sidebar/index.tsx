import Image from 'next/image'
import Link from 'next/link'

import { Headset, LogOut } from 'lucide-react'

import { Logo } from '@user-app/modules/@shared/assets'

import { sidebarMenuItems } from '../../constants/sidebar-menu-items'
import { NavItem } from '../nav-item'
import {
  Button,
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
      <SidebarHeader className="border-sidebar-border h-[72px] border-b">
        <Link href="/meus-pets">
          <Image
            src={Logo}
            width={64}
            height={64}
            quality={100}
            priority
            alt="Logo de um animal com a face metade gato e metade cachorro."
            className="mx-4"
          />
        </Link>
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
      <SidebarFooter className="p-4 pb-10">
        <Link
          href="/auth/sign-out"
          className={buttonVariants({ variant: 'outline' })}
          data-testid="sign-out-button"
        >
          <LogOut />
          Sair
        </Link>

        <Button variant="link">
          precisando de ajuda?
          <Headset size={16} />
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
