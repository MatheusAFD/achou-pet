import { setupWorker } from 'msw/browser'

import { getMeMock } from './auth'

export const worker = setupWorker(...getMeMock)
