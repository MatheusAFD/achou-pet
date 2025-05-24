import { createAddress, getAddresses } from './addresses'
import { getMeMock, signInMock } from './auth'
import { getMePetsMock } from './pets'

export const handlers = [
  ...getMeMock,
  ...signInMock,
  ...getMePetsMock,
  ...getAddresses,
  ...createAddress
]
