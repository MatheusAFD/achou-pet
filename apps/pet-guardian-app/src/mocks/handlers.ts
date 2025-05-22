import { createAddress } from './addresses/create-address.mock'
import { getAddresses } from './addresses/get-addresses.mock'
import { getMeMock, signInMock } from './auth'
import { getMePetsMock } from './pets/pets-me'

export const handlers = [
  ...getMeMock,
  ...signInMock,
  ...getMePetsMock,
  ...getAddresses,
  ...createAddress
]
