export interface PaginatedResponse<T> {
  data: T
  pagination: Pagination
}

export interface Pagination {
  nextPage: number
  previousPage: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}
