import { Mars, Siren, Venus } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import { ChildTooltip, Conditional } from '@user-app/modules/@shared/components'

import { petSizeParser } from '../../utils'
import { PetBasicInfoProps } from './types'

export const PetBasicInfo = (props: PetBasicInfoProps) => {
  const { gender, isMissing, size, species } = props

  return (
    <div>
      <Conditional condition={isMissing} withFadeRender>
        <div className="text-primary/80 mb-2 flex animate-pulse items-center gap-2">
          <Siren />
          <p className="text-sm">Desaparecido</p>
        </div>
      </Conditional>

      <div
        className={twMerge(
          'flex flex-col justify-center',
          isMissing && 'opacity-50'
        )}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500">Gênero:</span>
          <Conditional condition={gender === 'MALE'}>
            <span className="flex items-center gap-1 text-sm font-normal text-blue-500">
              <Mars size={15} /> Macho
            </span>
          </Conditional>

          <Conditional condition={gender === 'FEMALE'}>
            <span className="flex items-center gap-1 text-sm font-normal text-pink-500">
              <Venus size={15} /> Fêmea
            </span>
          </Conditional>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500">Espécie:</span>
          <span className="text-sm font-normal text-gray-700 capitalize">
            {species}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500">Porte:</span>
          <ChildTooltip content={`${petSizeParser[size]} porte`} side="bottom">
            <p className="text-sm text-gray-700">{petSizeParser[size]}</p>
          </ChildTooltip>
        </div>
      </div>
    </div>
  )
}
