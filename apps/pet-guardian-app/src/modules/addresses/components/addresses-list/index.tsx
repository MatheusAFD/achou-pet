import { getAddresses } from '../../services'
import { Address } from '../../services/get-address/types'
import { AddressCard } from '../address-card'

export const AddressesList = async () => {
  const [error, data] = await getAddresses()

  console.log(error)

  return (
    <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 place-items-center lg:place-items-start gap-8 mt-8">
      {data?.map((address: Address) => {
        return <AddressCard key={address.id} address={address} />
      })}
    </ul>
  )
}
