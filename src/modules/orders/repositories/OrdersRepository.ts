import { dataSource } from '@datasource'
import { Order } from '@orders/entities/Order'
import { ISearchParams } from '@orders/interfaces/OrdersInterface'

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
  },

  async findAllFilters({ page, limit, filters = {} }: ISearchParams) {
    const query = this.createQueryBuilder('orders')
      .leftJoinAndSelect('orders.car', 'car')
      .leftJoinAndSelect('orders.customer', 'customer')
    const { status, customerCpf, startDate, endDate, order } = filters

    if (status) {
      query.andWhere('orders.status = :status', { status })
    }

    if (customerCpf) {
      query.andWhere('customer.cpf = :customerCpf', { customerCpf })
    }

    if (startDate) {
      query.andWhere('orders.start_date >= :startDate', { startDate })
    }

    if (endDate) {
      const endDateTime = new Date(endDate)
      endDateTime.setHours(23, 59, 59, 999)
      const localEndDateTime = new Date(
        endDateTime.getTime() + endDateTime.getTimezoneOffset() * 420000
      )
      const dateString = localEndDateTime.toISOString()
      query.andWhere('orders.end_date <= :endDate', {
        endDate: dateString
      })
    }

    if (limit < 1 || limit == undefined) {
      limit = 5
    } else if (limit > 10) {
      limit = 10
    }

    if (page < 1 || page == null) {
      page = 1
    }

    const [result, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy(`orders.created_at`, order?.toUpperCase() as 'ASC' | 'DESC')
      .getManyAndCount()

    return { result, total }
  },
  
  async deleteOrder(order: Order) {
    return this.createQueryBuilder('orders')
      .update('orders')
      .set({ cancel_date: new Date(), status: 'canceled' })
      .where('orders.id = :id', { id: order.id })
      .execute()

  }
})
