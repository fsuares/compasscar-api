import AppError from '@errors/AppError'
import { CarsRepository } from '@cars/repositories/CarsRepository'
import { IRequestUpdate } from '@cars/interfaces/CarInterfaces'
import { CarStatus } from '@utils/car.status.enum'

export class UpdateCarService {
  public async execute({
    id,
    license_plate,
    brand,
    model,
    km,
    year,
    price,
    items,
    status
  }: IRequestUpdate & { status: CarStatus }): Promise<any> {
    const car = await CarsRepository.findByID(id)
    if (!car || car.status === CarStatus.EXCLUDED) {
      throw new AppError('Car not found', 404)
    }

    car.license_plate = license_plate
    car.brand = brand
    car.model = model
    car.km = km
    car.year = year
    car.price = price
    car.items = items
    car.status = status

    await CarsRepository.save(car)
    return car
  }
}
