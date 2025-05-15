import Image from 'next/image'

import { Edit, Settings2 } from 'lucide-react'

import {
  Button,
  ChildTooltip,
  CustomCard
} from '@user-app/modules/@shared/components'
import { zipCodeMask } from '@user-app/modules/@shared/utils'

import { Address } from '../../services/get-address/types'

interface AddressCardProps {
  address: Address
}

export const AddressCard = ({ address }: AddressCardProps) => {
  const {
    address: street,
    number,
    neighborhood,
    city,
    state,
    zipCode
  } = address
  return (
    <CustomCard as="li" className="p-8 w-fit outline outline-primary/50">
      <section className="flex flex-col items-center gap-4">
        <Image
          src="/address-map.svg"
          width={256}
          height={256}
          alt="Imagem no estilo desenho de um mapa com o endereço"
        />

        <div className="flex flex-col items-center gap-4">
          <address className="not-italic font-medium text-sm text-gray-700">
            <p>
              {street} {number}
            </p>
            <p>{neighborhood}</p>
            <p>
              {city}, {state} {zipCodeMask(zipCode)}
            </p>
          </address>
          <footer className="flex items-center gap-2">
            <ChildTooltip content="Editar endereço">
              <Button size="icon" variant="outline">
                <Edit />
              </Button>
            </ChildTooltip>
            <Button variant="outline">
              <Settings2 /> Tornar padrão
            </Button>
          </footer>
        </div>
      </section>
    </CustomCard>
  )
}
