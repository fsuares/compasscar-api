import { Request, Response } from 'express'
import { CreateCarsService } from '../models/cars/services/CreateCarService'

export default class UsersController {
  public async create(req: Request, res: Response): Promise<any> {
    const { license_plate, brand, model, km, year, price, items } = req.body

    const createCar = new CreateCarsService()

    const cars = await createCar.execute({
      license_plate,
      brand,
      model,
      km,
      year,
      price,
      items
    })

    return res.status(201).json(cars)
  }
}
