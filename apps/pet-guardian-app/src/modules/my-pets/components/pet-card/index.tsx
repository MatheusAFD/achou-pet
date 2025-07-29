'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Edit, ExternalLink } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import { Logo } from '@user-app/modules/@shared/assets'
import {
  Avatar,
  AvatarFallback,
  CustomCard,
  DropdownMenuItem,
  Skeleton,
  Switch,
  MoreOptionsMenu
} from '@user-app/modules/@shared/components'
import {
  PetBasicInfo,
  PetHealthInfo
} from '@user-app/modules/my-pets/components'

import { useOptimisticMissing } from '../../hooks/use-optmistic-missing'
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
    isMissing,
    isVaccinated,
    needsMedication,
    hasAllergies,
    photoUrl
  } = pet

  const { optimisticMissing, toggleMissing } = useOptimisticMissing(
    isMissing,
    pet.id
  )

  return (
    <CustomCard
      as="li"
      className={twMerge(
        'border-border/80 hover:border-primary/50 relative flex items-center gap-6 border p-4 transition-all duration-200 ease-in-out',
        optimisticMissing && 'opacity-100'
      )}
    >
      <div
        className={twMerge(
          'relative flex flex-col items-center p-2',
          optimisticMissing && 'animate-pulse'
        )}
      >
        <Avatar className="border-primary size-24 border-2 shadow-md">
          <Image
            src={photoUrl || Logo}
            alt="Imagem de perfil do pet"
            width={112}
            height={112}
            quality={100}
            className="object-cover"
            priority
          />
          <AvatarFallback>
            <Skeleton className="size-28" />
          </AvatarFallback>
        </Avatar>

        <span className="text-tertiary mt-2 text-center text-base font-medium tracking-wide">
          {name}
        </span>
      </div>

      <PetBasicInfo
        gender={gender}
        isMissing={optimisticMissing}
        size={size}
        species={species}
      />

      <PetHealthInfo
        hasAllergies={hasAllergies}
        isVaccinated={isVaccinated}
        needsMedication={needsMedication}
      />

      <div className="absolute top-3 right-3 flex flex-col gap-2">
        <MoreOptionsMenu>
          <DropdownMenuItem onSelect={onEdit}>
            <Edit />
            Editar
          </DropdownMenuItem>

          <Link href={`/pet/${pet.credentialId}`} target="_blank">
            <DropdownMenuItem>
              <ExternalLink size={15} />
              Página pública
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem>
            <Switch
              id="is-missing"
              checked={optimisticMissing}
              onCheckedChange={toggleMissing}
            />
            <label htmlFor="is-missing">Desaparecido</label>
          </DropdownMenuItem>
        </MoreOptionsMenu>
      </div>
    </CustomCard>
  )
}
