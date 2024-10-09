import { Request, Response } from 'express'
import { CreateCarsService } from '@cars/services/CreateCarService'
import { ShowCarService } from '@cars/services/ShowCarService'

export default class UsersController {
  public async show(req: Request, res: Response): Promise<any> {
    const { id } = req.params
    const showCar = new ShowCarService()
    const car = await showCar.execute({ id })
    return res.status(200).json(car)
  }

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
