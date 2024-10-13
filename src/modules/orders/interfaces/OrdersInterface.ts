import { OrderStatus } from '@utils/order.status.enum'

export interface ICreateOrder {
  customer_id: string
  car_id: string
  cep: string
  start_date: Date
  end_date: Date
}

export interface IUpdateRequest {
  id: string
  start_date: Date
  end_date: Date
  cep: string
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
