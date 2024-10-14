import AppError from '@errors/AppError'
import { CarsRepository } from '@cars/repositories/CarsRepository'
import { OrdersRepository } from '@orders/repositories/OrdersRepository'
import { CarStatus } from '@utils/car.status.enum'
import { OrderStatus } from '@utils/order.status.enum'

export class DeleteCarService {
  public async execute(id: string): Promise<void> {
    const car = await CarsRepository.findByID(id)
    if (!car || car.status === CarStatus.EXCLUDED) {
      throw new AppError('car not found or excluded', 404)
    }

    const carOrder = await OrdersRepository.findByCar(id)
    carOrder.forEach((order) => {
      if (order.status === 'open' || order.status === OrderStatus.APPROVED) {
        throw new AppError(`can't delete... Car currently rented`, 409)
      }
    })

    await CarsRepository.deleteCar(id)
  }
}
