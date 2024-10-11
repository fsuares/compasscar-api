import { Customer } from '@customers/entities/Customer'

export interface IListParams {
  page: number
  limit: number
  filters?: any
}

export interface ICustomerPaginate {
  total: number
  total_pages: number
  per_page: number
  data: Customer[]
}

export interface ISearchParams {
  page: number
  skip: number
  take: number
  filters?: any
}
