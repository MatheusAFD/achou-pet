import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Phone } from 'lucide-react'

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
    redirect('/auth/sign-up')
  }

  const pet = data?.pet
  const user = data?.user
  const primaryAddress = data?.primaryAddress

  if (!pet) {
    redirect('/auth/sign-in')
  }

  return (
    <main className="min-h-lvh bg-tertiary flex flex-col items-center py-8 px-2">
      <Container className="w-full max-w-2xl flex flex-col gap-8">
        <CustomCard className="flex flex-col md:flex-row gap-6 items-center p-6 shadow-lg border border-primary/30 bg-white/95">
          <div className="flex flex-col items-center md:items-start gap-4 w-full md:w-1/2">
            <Avatar className="size-32 border-2 border-primary shadow-md bg-white">
              <Image
                src={pet?.photoUrl || '/logo.png'}
                width={128}
                height={128}
                quality={100}
                alt="Foto do pet"
                className="object-cover rounded-full"
              />
            </Avatar>
            <h2 className="text-2xl font-bold text-primary text-center md:text-left w-full">
              Me encontrou!
            </h2>
            <p className="text-lg font-semibold text-tertiary text-center md:text-left w-full">
              {pet?.name}
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-1/2">
            <div className="flex flex-wrap gap-2">
              <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                {pet?.species}
              </span>
              <Conditional condition={!!pet?.breed}>
                <span className="bg-secondary/80 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                  {pet?.breed}
                </span>
              </Conditional>
              <span className="bg-tertiary text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                {petSizeParser[pet.size]}
              </span>
              <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                {pet?.gender === 'MALE' ? 'Macho' : 'Fêmea'}
              </span>
              <Conditional condition={!!pet?.color}>
                <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                  {pet?.color}
                </span>
              </Conditional>
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <Conditional condition={!!pet?.isVaccinated}>
                <span className="text-xs text-green-700 font-bold bg-green-100 rounded px-2 py-0.5 w-fit">
                  Vacinado
                </span>
              </Conditional>
              <Conditional condition={!!pet?.hasAllergies}>
                <span className="text-xs text-yellow-800 font-bold bg-yellow-100 rounded px-2 py-0.5 w-fit">
                  Possui alergias
                </span>
              </Conditional>
              <Conditional
                condition={!!pet?.needsMedication || pet.hasAllergies}
              >
                <Conditional condition={!!pet?.needsMedication}>
                  <span className="text-xs text-pink-800 font-bold bg-pink-100 rounded px-2 py-0.5 w-fit">
                    Precisa de medicação
                  </span>
                </Conditional>

                <Conditional condition={!!pet?.hasAllergies}>
                  <span className="text-xs text-pink-800 font-bold bg-pink-100 rounded px-2 py-0.5 w-fit">
                    Possui alergias
                  </span>
                </Conditional>
                <Conditional condition={true}>
                  <span className="text-xs text-gray-800 bg-gray-100 rounded px-2 py-0.5 w-fit">
                    {pet?.medicationDescription}
                  </span>
                </Conditional>
              </Conditional>
            </div>
          </div>
        </CustomCard>

        <CustomCard className="flex flex-col gap-4 p-6 shadow-lg border-2 border-secondary bg-white/95">
          <h2 className="text-xl font-bold text-primary mb-2">
            Quem você pode contactar
          </h2>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <span className="text-lg font-semibold text-tertiary">
                {user?.name} {user?.lastName}
              </span>
              <Link href={`tel:${user?.phone}`} target="_blank">
                <span className="flex items-center gap-2 text-base text-primary font-bold">
                  <Phone size={18} /> {phoneMask(user?.phone ?? '')}
                </span>
              </Link>
            </div>
            <Conditional condition={!!primaryAddress}>
              <div className="flex flex-col gap-1 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 shadow-sm">
                <span className="text-xs text-gray-700 font-semibold">
                  Localização aproximada
                </span>
                <span className="text-sm text-gray-900 font-bold">
                  {primaryAddress?.city} / {primaryAddress?.state}
                </span>
                <span className="text-xs text-gray-800 font-semibold">
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
