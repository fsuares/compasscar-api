import { OrderStatus } from '@utils/order.status.enum'

export interface ICreateOrder {
  customer_id: string
  car_id: string
  cep: string
  start_date: Date
  end_date: Date
}

export interface IUpdateRequest
  extends Omit<ICreateOrder, 'customer_id' | 'car_id'> {
  id: string
  status: OrderStatus
}

export interface IOrderResponse {
  id: string
  status: string
  orderDate: Date
  startDate: Date
  endDate: Date
  orderFee: number
  totalValue: number
  cep: string
  city: string
  uf: string
  customer: {
    id: string
    name: string
    email: string
    cpf: string
  }
  car: {
    id: string
    brand: string
    model: string
    year: number
    km: number
    items: string[]
    licensePlate: string
    dailyValue: number
  }
}

interface ICustomerWithoutEmail {
  id: string
  name: string
  cpf: string
}

export interface IListOrderResponse {
  id: string
  status: string
  orderDate: Date
  startDate: Date
  endDate: Date
  orderFee: number
  totalValue: number
  cep: string
  city: string
  uf: string
  customer: ICustomerWithoutEmail
}

export interface IOrdersPaginate {
  total: number
  pages: number
  limit: number
  data: IListOrderResponse[]
}
interface IFilters {
  status?: string
  customerCpf?: string
  startDate?: Date
  endDate?: Date
  order?: string
}
export interface ISearchParams {
  limit: number
  page: number
  filters?: IFilters
}
