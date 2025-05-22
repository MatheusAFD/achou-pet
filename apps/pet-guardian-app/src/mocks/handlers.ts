import { getMeMock, signInMock } from './auth'

export const handlers = [...getMeMock, ...signInMock]
