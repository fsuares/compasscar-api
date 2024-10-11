import { Customer } from '../entities/Customer'
import { CustomersRepository } from '../repositories/CustomersRepository'
import AppError from '@errors/AppError'

interface IRequest {
  id: string
}

export class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customer> {
    const customer = await CustomersRepository.findByID(id)

    if (!customer) {
      throw new AppError('Customer not found', 404)
    }

    return customer
  }
}
