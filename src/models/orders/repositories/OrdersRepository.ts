import { dataSource } from '@datasource'
import { Order } from '@orders/entities/Order'
import { ICreateOrder } from '@orders/interfaces/OrdersInterface'
import { create } from 'domain'

export const OrdersRepository = dataSource.getRepository(Order).extend({
  async findByCustomer(customer_id: string) {
    return this.createQueryBuilder('orders')
      .where('orders.customer_id = :customer_id', { customer_id })
      .getMany()
  },

  async findByCar(car_id: string) {
    return this.createQueryBuilder('orders')
      .where('orders.car_id = :car_id', { car_id })
      .getMany()
  },

  async findByID(id: string) {
    return this.createQueryBuilder('orders')
      .where('orders.id = :id', { id })
      .getOne()
  },

  async findByStatus(status: string) {
    return this.createQueryBuilder('orders')
      .where('orders.status = :status', { status })
      .getMany()
  }
})
