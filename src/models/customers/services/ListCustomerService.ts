import AppError from '@errors/AppError'
import { CustomersRepository } from '@customers/repositories/CustomersRepository'
import {
  ICustomerPaginate,
  IListParams
} from '@customers/interfaces/CustomersInterfaces'

export class ListCustomerService {
  public async execute({
    page,
    limit,
    filters
  }: IListParams): Promise<ICustomerPaginate> {
    const take = limit
    const skip = (Number(page) - 1) * take
    const customers = await CustomersRepository.findAll({
      page,
      skip,
      take,
      filters
    })

    if (customers.data.length === 0) {
      throw new AppError('Customers not found', 404)
    }

    return customers
  }
}
