import { Request, Response } from 'express'
import { CreateCustomerService } from '@customers/services/CreateCustomerService'
import { ShowCustomerService } from '@customers/services/ShowCustomerService'
import { DeleteCustomerService } from '@customers/services/DeleteCustomerService'

export default class CustomersController {
  public async create(req: Request, res: Response): Promise<any> {
    const { name, birth_date, cpf, email, phone } = req.body

    const createCustomer = new CreateCustomerService()

    const customer = await createCustomer.execute({
      name,
      birth_date,
      cpf,
      email,
      phone
    })

    return res.status(201).json(customer)
  }

  public async show(req: Request, res: Response): Promise<any> {
    const { id } = req.params

    const showCustomer = new ShowCustomerService()

    const customer = await showCustomer.execute({
      id
    })

    return res.status(200).json(customer)
  }

  public async delete(req: Request, res: Response): Promise<any> {
    const { id } = req.params

    const deleteCustomer = await new DeleteCustomerService().execute(id)
    return res.status(204).send()
  }
}
