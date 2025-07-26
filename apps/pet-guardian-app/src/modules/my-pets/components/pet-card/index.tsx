'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Edit, Mars, Venus, ExternalLink } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import { Logo } from '@user-app/modules/@shared/assets'
import {
  Avatar,
  AvatarFallback,
  ChildTooltip,
  Conditional,
  CustomCard,
  DropdownMenuItem,
  Skeleton,
  Switch
} from '@user-app/modules/@shared/components'
import { MoreOptionsMenu } from '@user-app/modules/@shared/components/more-options-button'

import { Pet } from '../../services/get-pet/types'
import { petSizeParser } from '../../utils'
import { PetHealthInfo } from '../pet-health-info'

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
    // isMissing,
    isVaccinated,
    needsMedication,
    hasAllergies,
    photoUrl
  } = pet

  const isMissing = true

  return (
    <CustomCard
      as="li"
      className={twMerge(
        'relative flex items-center gap-6 p-4 border border-border/80 hover:border-primary/50 transition-all duration-200 ease-in-out'
      )}
    >
      <div
        className={twMerge(
          'relative flex flex-col items-center p-2',
          isMissing && 'animate-pulse'
        )}
      >
        <Avatar className=" size-24 border-2 border-primary shadow-md">
          <Image
            src={photoUrl || Logo}
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

          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Switch id="is-missing" />
            <label htmlFor="is-missing">Desaparecido</label>
          </DropdownMenuItem>
        </MoreOptionsMenu>
      </div>

      <PetHealthInfo
        healthData={{
          isVaccinated,
          needsMedication,
          hasAllergies
        }}
      />
    </CustomCard>
  )
}
