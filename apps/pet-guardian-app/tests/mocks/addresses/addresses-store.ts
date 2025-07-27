import { Address } from '@user-app/modules/addresses/services/get-address/types'

export const addressesStore: Address[] = [
  {
    id: '1',
    userId: '1',
    type: 'PRIMARY',
    address: 'Rua Exemplo',
    number: '100',
    complement: null,
    neighborhood: 'Centro',
    reference: 'Próximo à praça',
    city: 'Várzea Grande',
    state: 'MT',
    zipCode: '78140400'
  }
]

export const address = {
  zipCode: '78140444',
  address: 'Rua da Tailândia',
  neighborhood: 'Glória',
  city: 'Várzea Grande',
  state: 'MT'
}
