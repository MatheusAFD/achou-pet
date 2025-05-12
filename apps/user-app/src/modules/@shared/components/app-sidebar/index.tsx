import { Headset } from 'lucide-react'

import { sidebarMenuItems } from '../../constants/sidebar-menu-items'
import { NavItem } from '../nav-item'
import {
  Button,
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
      <SidebarHeader className="px-6 py-5 h-[72px]  border-b border-sidebar-border">
        <Button size="sm" className="w-24 bg-black self-start">
          Logo
        </Button>
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
        <Button variant="link">
          precisando de ajuda?
          <Headset size={16} />
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
