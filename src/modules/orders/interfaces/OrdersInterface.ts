import { Customer } from '@customers/entities/Customer'
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
