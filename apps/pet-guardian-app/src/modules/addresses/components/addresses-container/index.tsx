import {
  Conditional,
  NoDataBackground
} from '@user-app/modules/@shared/components'

import { getAddresses } from '../../services'
import { AddressesList } from '../addresses-list'

export const AddressesContainer = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, data] = await getAddresses()

  const hasData = Boolean(data?.length)

  return (
    <>
      <Conditional condition={hasData}>
        <AddressesList data={data} />
      </Conditional>

      <Conditional condition={!hasData}>
        <NoDataBackground
          src="/address-map.svg"
          text="Você ainda não tem endereço cadastrado!"
          alt="Imagem de um mapa com um ponto de localização"
          className="mt-10"
        />
      </Conditional>
    </>
  )
}
