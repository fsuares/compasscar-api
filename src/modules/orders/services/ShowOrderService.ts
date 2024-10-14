import AppError from '@errors/AppError'
import { OrdersRepository } from '@orders/repositories/OrdersRepository'

export class ShowOrderService {
  public async execute(order_id: string): Promise<any> {
    const order = await OrdersRepository.findByID(order_id)
    if (!order) {
      throw new AppError('Order not found', 404)
    }

    return order
  }
}
