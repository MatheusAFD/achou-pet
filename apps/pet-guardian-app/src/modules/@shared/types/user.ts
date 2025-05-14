export interface User {
  id: string
  name: string
  lastName: string
  email: string
  phone: string
  role: string
  canDisplayAddress: boolean
  lastLogin: string | Date | null
  updatedAt: string | Date | null
  createdAt: string | Date | null
  deletedAt: string | Date | null
}
