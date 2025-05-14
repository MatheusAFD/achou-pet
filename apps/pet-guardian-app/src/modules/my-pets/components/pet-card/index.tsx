'use client'

import Image from 'next/image'

import { Edit, Mars, Venus, Syringe, Pill, BeanOff } from 'lucide-react'

import {
  Avatar,
  Button,
  ChildTooltip,
  Conditional,
  CustomCard
} from '@user-app/modules/@shared/components'

import { Pet } from '../../services/get-pet/types'

interface PetCardProps {
  pet: Pet
  onEdit?: VoidFunction
}

export const PetCard = ({ pet, onEdit }: PetCardProps) => {
  const {
    name,
    gender,
    species,
    size,
    isVaccinated,
    needsMedication,
    hasAllergies,
    photoUrl
  } = pet

  const dogSize = {
    SMALL: 'Pequeno',
    MEDIUM: 'Médio',
    LARGE: 'Grande'
  }

  return (
    <CustomCard className="relative flex items-center gap-6 p-4 border border-border/80 hover:border-primary/50 transition-all duration-200 ease-in-out">
      <div className="flex flex-col items-center ">
        <Avatar className="size-28 border-2 border-primary shadow-md">
          <Image
            src={photoUrl || '/logo.png'}
            width={112}
            height={112}
            quality={100}
            alt="Imagem de perfil do pet"
            className="object-cover"
          />
        </Avatar>
        <span className="mt-2 text-base font-medium text-tertiary text-center tracking-wide">
          {name}
        </span>
      </div>

      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-medium">Gênero:</span>
          <Conditional condition={gender === 'MALE'}>
            <span className="flex items-center gap-1 text-blue-500 font-normal text-sm">
              <Mars size={15} /> Macho
            </span>
          </Conditional>

          <Conditional condition={gender === 'FEMALE'}>
            <span className="flex items-center gap-1 text-pink-500 font-normal text-sm">
              <Venus size={15} /> Fêmea
            </span>
          </Conditional>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-medium">Espécie:</span>
          <span className="text-gray-700 font-normal capitalize text-sm">
            {species}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-medium">Porte:</span>
          <ChildTooltip content={`${dogSize[size]} porte`} side="bottom">
            <p className="text-sm text-gray-700">{dogSize[size]}</p>
          </ChildTooltip>
        </div>
      </div>

      <ChildTooltip content="Editar">
        <Button
          variant="outline"
          size="icon"
          className="absolute top-3 right-3 border-tertiary hover:bg-tertiary/10"
          onClick={onEdit}
        >
          <Edit size={15} className="text-tertiary" />
        </Button>
      </ChildTooltip>

      <div className="absolute bottom-3 right-3.5 flex gap-2">
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
    </CustomCard>
  )
}
