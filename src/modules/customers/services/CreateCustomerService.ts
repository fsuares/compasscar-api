import { ICreateCustomer } from '@customers/interfaces/CustomersInterfaces'
import { CustomersRepository } from '@customers/repositories/CustomersRepository'
import AppError from '@errors/AppError'

export class CreateCustomerService {
  public async execute({
    name,
    birth_date,
    cpf,
    email,
    phone
  }: ICreateCustomer): Promise<String> {
    const ifEmailExists =
      await CustomersRepository.findByEmailAndCheckIfExcludedIsNull(email)

    if (ifEmailExists) {
      throw new AppError(
        'email already exists and the customer is active.',
        409
      )
    }

    const ifCpfExists =
      await CustomersRepository.findByCpfAndCheckIfExcludedIsNull(cpf)

    if (ifCpfExists) {
      throw new AppError('cpf already exists and the customer is active.', 409)
    }

    const customer = CustomersRepository.create({
      name,
      birth_date: birth_date?.substring(0, 10),
      cpf,
      email,
      phone
    })

    await CustomersRepository.save(customer)
    return customer.id
  }
}
