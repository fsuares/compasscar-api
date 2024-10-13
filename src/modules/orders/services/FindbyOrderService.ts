import AppError from '@errors/AppError'
import { IOrderResponse } from '@orders/interfaces/OrdersInterface'
import { OrdersRepository } from '@orders/repositories/OrdersRepository'

export class FindByIdOrderService {
  public async execute(id: string): Promise<IOrderResponse | any> {
    const order = await OrdersRepository.findOne({
      where: { id },
      relations: ['car', 'customer']
    })
    if (!order) {
      throw new AppError('order not found', 404)
    }
    const response: IOrderResponse = {
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
        email: order.customer.email,
        cpf: order.customer.cpf
      },
      car: {
        id: order.car.id,
        brand: order.car.brand,
        model: order.car.model,
        year: order.car.year,
        km: order.car.km,
        items: order.car.items,
        licensePlate: order.car.license_plate,
        dailyValue: order.car.price
      }
    }

    return response
  }
}
