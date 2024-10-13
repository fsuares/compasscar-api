import { IUpdateCustomer } from '@customers/interfaces/CustomersInterfaces'
import { CustomersRepository } from '../repositories/CustomersRepository'
import AppError from '@errors/AppError'

export class UpdateCustomerService {
  public async execute({
    id,
    name,
    birth_date,
    cpf,
    email,
    phone
  }: IUpdateCustomer): Promise<any> {
    const customer = await CustomersRepository.findByID(id)
    if (!customer) {
      throw new AppError('customer not found', 404)
    }

    if (customer.excluded_at) {
      throw new AppError('cannot update a deleted customer', 409)
    }

    const ifEmailExists =
      await CustomersRepository.findByEmailAndCheckIfExcludedIsNull(email)

    if (ifEmailExists && email != customer.email) {
      throw new AppError(
        'email already exists and the customer is active.',
        409
      )
    }

    const ifCpfExists =
      await CustomersRepository.findByCpfAndCheckIfExcludedIsNull(cpf)

    if (ifCpfExists && cpf != customer.cpf) {
      throw new AppError('cpf already exists and the customer is active.', 409)
    }

    if (name) customer.name = name
    if (birth_date) customer.birth_date = birth_date.substring(0, 10)
    if (cpf) customer.cpf = cpf
    if (email) customer.email = email
    if (phone) customer.phone = phone
    await CustomersRepository.save(customer)
    return customer
  }
}
