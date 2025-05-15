import {
  Conditional,
  NoDataBackground
} from '@user-app/modules/@shared/components'

import { getPets } from '../../services'
import { PetsList } from '../pets-list'

export const PetsContainer = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, data] = await getPets()

  const hasData = Boolean(data?.length)

  return (
    <>
      <Conditional condition={hasData}>
        <PetsList data={data} />
      </Conditional>

      <Conditional condition={!hasData}>
        <NoDataBackground
          src="/add-something.svg"
          text="Você ainda não um tem pet cadastrado!"
          alt="Imagem ilustrada de uma pessoa com um quadro branco a direita."
          className="mt-10"
        />
      </Conditional>
    </>
  )
}
