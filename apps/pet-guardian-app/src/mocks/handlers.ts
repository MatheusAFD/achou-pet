import { getMeMock, signInMock } from './auth'
import { getMePetsMock } from './pets/pets-me'

export const handlers = [...getMeMock, ...signInMock, ...getMePetsMock]
