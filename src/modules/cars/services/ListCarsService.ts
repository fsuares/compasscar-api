import AppError from '@errors/AppError'
import { CarsRepository } from '@cars/repositories/CarsRepository'
import { ICarPaginate, IRequestIndex } from '@cars/interfaces/CarInterfaces'

export class ListCarService {
  public async execute({
    page,
    limit,
    filters
  }: IRequestIndex): Promise<ICarPaginate> {
    const skip = (Number(page) - 1) * limit
    const cars = await CarsRepository.findAll({
      page,
      skip,
      limit,
      filters
    })

    if (cars.data.length === 0) {
      throw new AppError('Cars not found', 404)
    }

    return cars
  }
}
