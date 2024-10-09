/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { dataSource } from '../database/data-source'

export default class CustomersController {
  public async create(req: Request, res: Response): Promise<any> {
    const { name, birth_date, cpf, email, phone } = req.body

    const customersRepository = dataSource.getRepository('customers')

    const customer = customersRepository.create({
      name,
      birth_date,
      cpf,
      email,
      phone
    })

    await customersRepository.save(customer)

    return res.status(201).json(customer)
  }
}
