import { MapPinHouse, PawPrint } from 'lucide-react'

export const sidebarMenuItems = [
  {
    label: 'Meus Pets',
    path: '/meus-pets',
    as: '/meus-pets',
    icon: PawPrint
  },
  {
    label: 'Meus Endereços',
    path: '/meus-enderecos',
    as: '/meus-enderecos',
    icon: MapPinHouse
  }
] as const
