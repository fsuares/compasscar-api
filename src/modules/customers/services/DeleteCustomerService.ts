import { CustomersRepository } from '../repositories/CustomersRepository'
import AppError from '@errors/AppError'

export class DeleteCustomerService {
  public async execute(id: string): Promise<void> {
    const customer = await CustomersRepository.findByID(id)

    if (!customer) {
      throw new AppError('customer not found', 404)
    }

    const date = new Date()

    await CustomersRepository.customersSoftDelete(id, date)
  }
}
