import AppError from '@errors/AppError'
import { CarsRepository } from '@cars/repositories/CarsRepository'
import { IRequestShow } from '@cars/interfaces/CarInterfaces'

export class ShowCarService {
  public async execute({ id }: IRequestShow): Promise<any> {
    const car = await CarsRepository.findByID(id)
    if (!car) {
      throw new AppError('Car not found', 404)
    }
    return car
  }
}
