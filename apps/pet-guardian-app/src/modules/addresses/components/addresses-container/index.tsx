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
          src="/searching-house.png"
          quality={100}
          text="Você ainda não um tem endereço cadastrado!"
          alt="Imagem ilustrada de uma casa com uma lupa."
          className="mt-10"
          priority
        />
      </Conditional>
    </>
  )
}
