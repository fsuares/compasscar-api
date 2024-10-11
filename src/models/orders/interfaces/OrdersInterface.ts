import { Customer } from '@customers/entities/Customer'

export interface ICreateOrder {
  customer_id: string
  car_id: string
  cep: string
  city: string
  uf: string
  start_date: Date
  end_date: Date
}
