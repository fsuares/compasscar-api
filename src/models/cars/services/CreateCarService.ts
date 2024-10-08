import { CarsRepository } from '../repositories/CarsRepository'

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
  }: ICreateCar) {
    const carAlreadyExists = await CarsRepository.findByModel(model)
    if (carAlreadyExists) {
      throw new Error('Car already exists')
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
    return car
  }
}
