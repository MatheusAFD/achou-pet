import * as bcrypt from 'bcryptjs'

import { env } from '../../../env'

const roundsOfHashing = env.BCRYPT_ROUNDS

export async function encryptData(data: string) {
  return await bcrypt.hash(data, roundsOfHashing)
}

export const compareEncryptValue = async (encrypted: string, value: string) => {
  return await bcrypt.compare(value, encrypted)
}
