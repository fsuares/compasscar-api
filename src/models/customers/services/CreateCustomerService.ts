import { Customer } from '../entities/Customer'
import { CustomersRepository } from '../repositories/CustomersRepository'

interface ICreateCustomer {
  name: string
  birth_date: string
  cpf: string
  email: string
  phone: string
}

export class CreateCustomerService {
  public async execute({
    name,
    birth_date,
    cpf,
    email,
    phone
  }: ICreateCustomer): Promise<Customer> {
    const formattedBirthDate = this.convertDateFormat(birth_date)

    const customer = CustomersRepository.create({
      name,
      birth_date: formattedBirthDate,
      cpf,
      email,
      phone
    })

    await CustomersRepository.save(customer)

    return customer
  }

  private convertDateFormat(dateStr: string): string {
    const [day, month, year] = dateStr.split('/')
    return `${year}-${month}-${day}`
  }
}
