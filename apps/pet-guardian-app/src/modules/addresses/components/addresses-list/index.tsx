import { getAddresses } from '../../services'
import { Address } from '../../services/get-address/types'
import { AddressCard } from '../address-card'

export const AddressesList = async () => {
  const [error, data] = await getAddresses()

  console.log(error)

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {data?.map((address: Address) => {
        return <AddressCard key={address.id} address={address} />
      })}
    </ul>
  )
}
