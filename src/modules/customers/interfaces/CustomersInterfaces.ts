import { Customer } from '@customers/entities/Customer'

export interface IListParams {
  page: number
  limit: number
  filters?: any
}

export interface ICustomerPaginate {
  total: number
  total_pages: number
  limit: number
  data: Customer[]
}

export interface ISearchParams extends Omit<IListParams, 'limit'> {
  skip: number
  take: number
}

export interface IUpdateCustomer {
  id: string
  name?: string
  birth_date?: string
  cpf?: string
  email?: string
  phone?: string
}

export interface IRequest {
  id: string
}

export interface ICreateCustomer extends Omit<IUpdateCustomer, 'id'> {}
