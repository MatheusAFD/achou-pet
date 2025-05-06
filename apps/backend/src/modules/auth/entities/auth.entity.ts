import { RoleEnum } from '@common/enums/db-enums'

export class AuthUser {
  id: string
  role: typeof RoleEnum
  iat: number
  exp: number
}
