import { Request, Response } from 'express'
import { CreateCustomerService } from '@customers/services/CreateCustomerService'
import { ShowCustomerService } from '@customers/services/ShowCustomerService'
import { DeleteCustomerService } from '@customers/services/DeleteCustomerService'
import { ListCustomerService } from '@customers/services/ListCustomerService'
import { UpdateCustomerService } from '@customers/services/UpdateCustomerService'

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

  public async index(req: Request, res: Response): Promise<any> {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const filters = req.query
    const listCustomer = new ListCustomerService()
    const customers = await listCustomer.execute({ page, limit, filters })
    return res.status(200).json(customers)
  }

  public async update(req: Request, res: Response): Promise<any> {
    const { id } = req.params
    const { name, birth_date, cpf, email, phone } = req.body

    const updateCustomer = new UpdateCustomerService()
    const updatedCustomer = await updateCustomer.execute({
      id,
      name,
      birth_date,
      cpf,
      email,
      phone
    })

    return res.status(201).json(updatedCustomer)
  }
}
