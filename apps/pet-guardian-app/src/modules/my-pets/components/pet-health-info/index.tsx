import { BeanOff, Pill, Syringe } from 'lucide-react'

import { ChildTooltip } from '@user-app/modules/@shared/components'

interface PetHealthInfoProps {
  healthData: {
    isVaccinated: boolean
    needsMedication: boolean
    hasAllergies: boolean
  }
}

export const PetHealthInfo = ({ healthData }: PetHealthInfoProps) => {
  const { isVaccinated, needsMedication, hasAllergies } = healthData

  return (
    <div className="absolute right-3.5 bottom-3 flex gap-2">
      <ChildTooltip content={isVaccinated ? 'Vacinado' : 'Não vacinado'}>
        <Syringe
          size={16}
          className={isVaccinated ? 'text-tertiary' : 'text-gray-300'}
        />
      </ChildTooltip>

      <ChildTooltip
        content={
          needsMedication ? 'Necessita remédio' : 'Não necessita remédio'
        }
      >
        <Pill
          size={16}
          className={needsMedication ? 'text-tertiary' : 'text-gray-300'}
        />
      </ChildTooltip>

      <ChildTooltip content={hasAllergies ? 'Alérgico' : 'Sem alergias'}>
        <BeanOff
          size={16}
          className={hasAllergies ? 'text-tertiary' : 'text-gray-300'}
        />
      </ChildTooltip>
    </div>
  )
}
