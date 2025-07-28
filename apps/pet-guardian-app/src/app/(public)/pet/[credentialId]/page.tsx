import Image from 'next/image'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

import { Phone } from 'lucide-react'

import { Logo } from '@user-app/modules/@shared/assets'
import {
  Conditional,
  Container,
  CustomCard,
  Avatar
} from '@user-app/modules/@shared/components'
import { phoneMask } from '@user-app/modules/@shared/utils'
import { getPetByCredentialId } from '@user-app/modules/my-pets/services/get-pet-by-crdential-id'
import { petSizeParser } from '@user-app/modules/my-pets/utils'

export default async function PetCredentialPage({
  params
}: {
  params: Promise<{ credentialId: string }>
}) {
  const { credentialId } = await params
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, data] = await getPetByCredentialId(credentialId)

  if (data?.status === 'INACTIVE') {
    redirect('/guia-de-uso')
  }

  const pet = data?.pet
  const user = data?.user
  const primaryAddress = data?.primaryAddress

  if (!pet) {
    notFound()
  }

  return (
    <main className="bg-tertiary flex min-h-lvh flex-col items-center px-2 py-8">
      <Container className="flex w-full max-w-2xl flex-col gap-8">
        <CustomCard className="border-primary/30 flex flex-col items-center gap-6 border bg-white/95 p-6 shadow-lg md:flex-row">
          <div className="flex w-full flex-col items-center gap-4 md:w-1/2 md:items-start">
            <Avatar className="border-primary size-32 border-2 bg-white shadow-md">
              <Image
                src={pet?.photoUrl || Logo}
                width={128}
                height={128}
                quality={100}
                alt="Foto do pet"
                className="rounded-full object-cover"
              />
            </Avatar>
            <h2 className="text-primary w-full text-center text-2xl font-bold md:text-left">
              Me encontrou!
            </h2>
            <p className="text-tertiary w-full text-center text-lg font-semibold md:text-left">
              {pet?.name}
            </p>
          </div>
          <div className="flex w-full flex-col gap-2 md:w-1/2">
            <div className="flex flex-wrap gap-2">
              <span className="bg-primary rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm">
                {pet?.species}
              </span>
              <Conditional condition={!!pet?.breed}>
                <span className="bg-secondary/80 rounded-full px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm">
                  {pet?.breed}
                </span>
              </Conditional>
              <span className="bg-tertiary rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm">
                {petSizeParser[pet.size]}
              </span>
              <span className="rounded-full bg-gray-800 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                {pet?.gender === 'MALE' ? 'Macho' : 'Fêmea'}
              </span>
              <Conditional condition={!!pet?.color}>
                <span className="rounded-full bg-gray-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                  {pet?.color}
                </span>
              </Conditional>
            </div>
            <div className="mt-2 flex flex-col gap-1">
              <Conditional condition={!!pet?.isVaccinated}>
                <span className="w-fit rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
                  Vacinado
                </span>
              </Conditional>
              <Conditional condition={!!pet?.hasAllergies}>
                <span className="w-fit rounded bg-yellow-100 px-2 py-0.5 text-xs font-bold text-yellow-800">
                  Possui alergias
                </span>
              </Conditional>
              <Conditional
                condition={!!pet?.needsMedication || pet.hasAllergies}
              >
                <Conditional condition={!!pet?.needsMedication}>
                  <span className="w-fit rounded bg-pink-100 px-2 py-0.5 text-xs font-bold text-pink-800">
                    Precisa de medicação
                  </span>
                </Conditional>

                <Conditional condition={!!pet?.hasAllergies}>
                  <span className="w-fit rounded bg-pink-100 px-2 py-0.5 text-xs font-bold text-pink-800">
                    Possui alergias
                  </span>
                </Conditional>
                <Conditional condition={true}>
                  <span className="w-fit rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-800">
                    {pet?.medicationDescription}
                  </span>
                </Conditional>
              </Conditional>
            </div>
          </div>
        </CustomCard>

        <CustomCard className="border-secondary flex flex-col gap-4 border-2 bg-white/95 p-6 shadow-lg">
          <h2 className="text-primary mb-2 text-xl font-bold">
            Quem você pode contactar
          </h2>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex flex-1 flex-col gap-1">
              <span className="text-tertiary text-lg font-semibold">
                {user?.name} {user?.lastName}
              </span>
              <Link href={`tel:${user?.phone}`} target="_blank">
                <span className="text-primary flex items-center gap-2 text-base font-bold">
                  <Phone size={18} /> {phoneMask(user?.phone ?? '')}
                </span>
              </Link>
            </div>
            <Conditional condition={!!primaryAddress}>
              <div className="flex flex-col gap-1 rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 shadow-sm">
                <span className="text-xs font-semibold text-gray-700">
                  Localização aproximada
                </span>
                <span className="text-sm font-bold text-gray-900">
                  {primaryAddress?.city} / {primaryAddress?.state}
                </span>
                <span className="text-xs font-semibold text-gray-800">
                  Bairro: {primaryAddress?.neighborhood}
                </span>
              </div>
            </Conditional>
          </div>
        </CustomCard>
      </Container>
    </main>
  )
}
