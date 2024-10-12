import AppError from '@errors/AppError'
import { CarsRepository } from '@cars/repositories/CarsRepository'
import { OrdersRepository } from '@orders/repositories/OrdersRepository'

export class DeleteCarService {
  public async execute(id: string): Promise<void> {
    const car = await CarsRepository.findByID(id)
    if (!car || car.status === 'excluido') {
      throw new AppError('Car not found or excluded', 404)
    }

    const carOrder = await OrdersRepository.findByCar(id)
    carOrder.forEach((order) => {
      if (order.status === 'open' || order.status === 'approved') {
        throw new AppError(`Can't delete... Car currently rented`, 409)
      }
    })

    await CarsRepository.deleteCar(id)
  }
}
