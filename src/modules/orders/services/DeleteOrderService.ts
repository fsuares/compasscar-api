import AppError from '@errors/AppError'
import { OrdersRepository } from '@orders/repositories/OrdersRepository'

export class DeleteOrderService {
  public async execute(id: string): Promise<any> {
    const order = await OrdersRepository.findByID(id)
    if (!order) {
      throw new AppError('Order not found', 404)
    }

    if (order.status !== 'open') {
      switch (order.status) {
        case 'approved':
          throw new AppError('Order already approved', 409)
        case 'canceled':
          throw new AppError('Order already canceled', 409)
        case 'closed':
          throw new AppError('Order already closed', 409)
      }
    }

    await OrdersRepository.deleteOrder(order)
    return order
  }
}
