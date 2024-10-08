/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { dataSource } from '../database/data-source'

export default class UsersController {
  public async create(req: Request, res: Response): Promise<any> {
    const { license_plate, brand, model, km, year, price, items } = req.body

    const carsRepository = dataSource.getRepository('cars')

    const cars = carsRepository.create({
      license_plate,
      brand,
      model,
      km,
      year,
      price,
      items
    })

    await carsRepository.save(cars)

    return res.status(201).json(cars)
  }
}
