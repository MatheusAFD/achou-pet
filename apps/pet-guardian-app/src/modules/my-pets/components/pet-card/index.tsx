'use client'

import Image from 'next/image'
import Link from 'next/link'

import {
  Edit,
  Mars,
  Venus,
  Syringe,
  Pill,
  BeanOff,
  ExternalLink
} from 'lucide-react'

import {
  Avatar,
  AvatarFallback,
  Button,
  ChildTooltip,
  Conditional,
  CustomCard,
  Skeleton
} from '@user-app/modules/@shared/components'

import { Pet } from '../../services/get-pet/types'
import { petSizeParser } from '../../utils'

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

  return (
    <CustomCard
      as="li"
      className="relative flex items-center gap-6 p-4 border border-border/80 hover:border-primary/50 transition-all duration-200 ease-in-out"
    >
      <div className="flex flex-col items-center p-2">
        <Avatar className="size-24 border-2 border-primary shadow-md">
          <Image
            src={photoUrl || '/logo.png'}
            width={112}
            height={112}
            quality={100}
            priority
            alt="Imagem de perfil do pet"
            className="object-cover"
          />
          <AvatarFallback>
            <Skeleton className="size-28" />
          </AvatarFallback>
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
          <ChildTooltip content={`${petSizeParser[size]} porte`} side="bottom">
            <p className="text-sm text-gray-700">{petSizeParser[size]}</p>
          </ChildTooltip>
        </div>
      </div>

      <div className="flex flex-col gap-2 absolute top-3 right-3">
        <ChildTooltip content="Editar">
          <Button
            variant="outline"
            size="icon"
            className="size-8 border-tertiary hover:bg-tertiary/10"
            onClick={onEdit}
          >
            <Edit size={15} className="text-tertiary" />
          </Button>
        </ChildTooltip>

        <ChildTooltip content="Página do Pet">
          <Link href={`/pet/${pet.credentialId}`} target="_blank">
            <Button
              variant="outline"
              size="icon"
              className="size-8 border-tertiary hover:bg-tertiary/10"
            >
              <ExternalLink size={15} className="text-tertiary" />
            </Button>
          </Link>
        </ChildTooltip>
      </div>

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
