import AppError from '@errors/AppError'
import { CarsRepository } from '@cars/repositories/CarsRepository'
import { CarStatus } from '@utils/car.status.enum'

interface ICreateCar {
  license_plate: string
  brand: string
  model: string
  km: number
  year: number
  price: number
  items: string[]
}

export class CreateCarsService {
  public async execute({
    license_plate,
    brand,
    model,
    km,
    year,
    price,
    items
  }: ICreateCar): Promise<String> {
    const carAlreadyExists = await CarsRepository.findByPlate(license_plate)
    if (
      carAlreadyExists &&
      carAlreadyExists.some((car) => car.status === CarStatus.ACTIVE)
    ) {
      throw new AppError('car already exists', 409)
    }

    const car = CarsRepository.create({
      license_plate,
      brand,
      model,
      km,
      year,
      price,
      items
    })

    await CarsRepository.save(car)
    return car.id
  }
}
