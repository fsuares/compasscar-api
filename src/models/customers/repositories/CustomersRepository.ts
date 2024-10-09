import { dataSource } from '../../../database/data-source'
import { Customer } from '../entities/Customer'

export const CustomersRepository = dataSource.getRepository(Customer).extend({})
