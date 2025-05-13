export interface BaseQueryFilters {
  page: number
  limit: number
  search?: string
}

export interface RouteParamsWithFilters {
  searchParams: Promise<BaseQueryFilters>
}
