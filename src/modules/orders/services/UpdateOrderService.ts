import AppError from '@errors/AppError'
import { OrdersRepository } from '@orders/repositories/OrdersRepository'
import { IUpdateRequest } from '@orders/interfaces/OrdersInterface'
import { locale } from '@orders/utils/viacep'
import { feeValues } from '@orders/utils/order.fee'
import { OrderStatus } from '@utils/order.status.enum'
import { calculateDay } from '@orders/utils/calculateDays'

export class UpdateOrderService {
  public async execute({
    id,
    start_date,
    end_date,
    cep,
    status
  }: IUpdateRequest): Promise<any> {
    const order = await OrdersRepository.findOne({
      where: { id },
      relations: ['car', 'customer']
    })
    if (!order) {
      throw new AppError('order not found', 404)
    }

    if (status) {
      switch (status) {
        case OrderStatus.CANCELED:
          if (order.status === OrderStatus.OPEN) {
            order.cancel_date = new Date()
            order.status = status
          } else {
            throw new AppError('order not open', 400)
          }
          break

        case OrderStatus.APPROVED:
          if (order.status === OrderStatus.OPEN) {
            order.status = status
          } else {
            throw new AppError('order not open', 400)
          }
          break

        case OrderStatus.CLOSED:
          if (order.status === OrderStatus.APPROVED) {
            if (order.end_date < new Date()) {
              const daily = calculateDay(order.start_date, order.end_date)
              const penalty = order.car.price * 2
              order.penalty_value = penalty * daily
            }
            order.closed_date = new Date()
            order.status = status
          } else {
            throw new AppError('order not approved', 400)
          }
          break
      }
    }

    if (cep) {
      const {
        uf,
        localidade
      }: { uf: keyof typeof feeValues; localidade: string } = await locale({
        cep
      })

      order.cep = cep
      order.city = localidade
      order.uf = uf
      order.order_fee = feeValues[uf]
    }

    if (start_date || end_date) {
      if (start_date > new Date()) {
        if (order.end_date < start_date) {
          throw new AppError('start_date must be less than end_date', 400)
        }
        order.start_date = start_date
      } else if (start_date < new Date()) {
        throw new AppError('start_date must be greater than current date', 400)
      }

      if (end_date > new Date()) {
        if (order.start_date > end_date) {
          throw new AppError('end_date must be greater than start_date', 400)
        }
        order.end_date = end_date
      } else if (end_date < new Date()) {
        throw new AppError('end_date must be greater than current date', 400)
      }
    }

    const total_value =
      calculateDay(order.start_date, order.end_date) * order.car.price +
      order.order_fee

    order.total_value = total_value

    await OrdersRepository.save(order)
    return order
  }
}
