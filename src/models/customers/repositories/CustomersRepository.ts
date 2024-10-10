import {
  ICustomerPaginate,
  ISearchParams
} from '@customers/interfaces/CustomersInterfaces'
import { dataSource } from '../../../database/data-source'
import { Customer } from '../entities/Customer'

export const CustomersRepository = dataSource.getRepository(Customer).extend({
  findByEmailAndCheckIfExcludedIsNull(email: string) {
    return this.createQueryBuilder('customers')
      .where('customers.email = :email', { email })
      .andWhere('customers.excluded_at IS NULL')
      .getOne()
  },

  findByCpfAndCheckIfExcludedIsNull(cpf: string) {
    return this.createQueryBuilder('customers')
      .where('customers.cpf = :cpf', { cpf })
      .andWhere('customers.excluded_at IS NULL')
      .getOne()
  },

  findByID(id: string) {
    return this.createQueryBuilder('customers')
      .where('customers.id = :id', {
        id
      })
      .getOne()
  },

  customersSoftDelete(id: string, date: Date) {
    return this.createQueryBuilder('customers')
      .update(Customer)
      .set({
        excluded_at: date
      })
      .where('id = :id', { id })
      .execute()
  },

  async findAll({
    page,
    skip,
    take,
    filters = {}
  }: ISearchParams): Promise<ICustomerPaginate> {
    const query = this.createQueryBuilder('customers').skip(skip).take(take)

    const filterConditions: { [key in keyof typeof filters]?: string } = {
      name: 'customers.name ILIKE :name',
      email: 'customers.email ILIKE :email',
      cpf: 'customers.cpf = :cpf',
      excluded:
        filters.excluded === 'true'
          ? 'customers.excluded_at IS NOT NULL'
          : 'customers.excluded_at IS NULL'
    }

    Object.keys(filters).forEach((key) => {
      const condition = filterConditions[key]
      if (condition) {
        const paramValue =
          key === 'name' || key === 'email' ? `%${filters[key]}%` : filters[key]
        query.andWhere(condition, { [key]: paramValue })
      }
    })

    if (filters.orderBy && filters.orderBy.length > 0) {
      const filtersOrder = new Set([filters.orderBy])
      const orderFields = new Set(['name', 'created_at', 'excluded_at'])
      filtersOrder.forEach((orderField: string, index: number) => {
        if (orderFields.has(orderField)) {
          query.addOrderBy(
            `customers.${orderField}`,
            filters.orderDirection?.[index] || filters.order
          )
        }
      })
    }

    const [customers, count] = await query.getManyAndCount()

    return {
      total: count,
      total_pages: Math.ceil(count / take),
      per_page: take,
      data: customers
    }
  }
})
