import AppError from '@errors/AppError'
import {
  IOrdersPaginate,
  ISearchParams
} from '@orders/interfaces/OrdersInterface'
import { OrdersRepository } from '@orders/repositories/OrdersRepository'

export class ListOrdersService {
  public async execute({
    page,
    limit,
    filters = {}
  }: ISearchParams): Promise<IOrdersPaginate> {
    const { result, total } = await OrdersRepository.findAllFilters({
      page,
      limit,
      filters
    })

    if (!result.length) {
      throw new AppError('orders not found', 404)
    }

    const orders = result.map((order) => ({
      id: order.id,
      status: order.status,
      orderDate: order.created_at,
      startDate: order.start_date,
      endDate: order.end_date,
      orderFee: order.order_fee,
      totalValue: order.total_value,
      cep: order.cep,
      city: order.city,
      uf: order.uf,
      customer: {
        id: order.customer.id,
        name: order.customer.name,
        cpf: order.customer.cpf
      }
    }))

    const totalPages = Math.ceil(total / limit)

    return {
      total,
      pages: totalPages,
      limit: limit,
      data: orders
    }
  }
}
