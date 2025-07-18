'use client'

import { useState } from 'react'

import { useDisclosure } from '@user-app/modules/@shared/hooks'

import { Address } from '../../services/get-address/types'
import { AddressCard } from '../address-card'
import { EditAddressModal } from '../edit-address-modal'

interface AddressesListProps {
  data: Address[] | null
}

export const AddressesList = (props: AddressesListProps) => {
  const { data } = props

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  )
  const { isOpen, onOpenChange } = useDisclosure()

  const handleEditAddress = (id: string) => {
    onOpenChange(true)
    setSelectedAddressId(id)
  }

  const onCloseEditModal = () => {
    setSelectedAddressId(null)
  }

  return (
    <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 place-items-center lg:place-items-start gap-8 mt-8">
      {data?.map((address: Address) => {
        return (
          <AddressCard
            key={address.id}
            address={address}
            onEdit={() => handleEditAddress(address.id)}
          />
        )
      })}

      <EditAddressModal
        addressId={selectedAddressId!}
        isOpen={isOpen}
        onClose={onCloseEditModal}
        onOpenChange={onOpenChange}
      />
    </ul>
  )
}
