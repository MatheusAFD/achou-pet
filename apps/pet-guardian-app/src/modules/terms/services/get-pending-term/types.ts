export interface UserTerm {
  id: string
  userId: string
  termId: string
  situation: 'PENDING' | 'ACCEPTED' | 'REFUSED'
  createdAt: string | Date | null
  updatedAt: string | Date | null
}

export interface Term {
  id: string
  version: string
  content: string
  createdAt: string | Date | null
  updatedAt: string | Date | null
}
