import { ISearchParams } from '@cars/interfaces/CarInterfaces'
import { dataSource } from '@database/data-source'
import { User } from '@users/entities/User'
import { IUserPaginate } from '@users/interface/UserInterfaces'

export const UsersRepository = dataSource.getRepository(User).extend({
  async findByID(id: string) {
    return this.createQueryBuilder('users')
      .where('users.id = :id', { id })
      .getOne()
  },

  async findByIdAndExcludedAt(id: string) {
    return this.createQueryBuilder('users')
      .where('users.id = :id', { id })
      .andWhere('excluded_at IS NULL')
      .getOne()
  },

  async findByEmail(email: string) {
    return this.createQueryBuilder('users')
      .where('users.email = :email', { email })
      .getMany()
  },

  async findByEmailAndExcludedAt(email: string) {
    return this.createQueryBuilder('users')
      .where('users.email = :email', { email })
      .andWhere('excluded_at IS NULL')
      .getMany()
  },

  async findByExcludedAt() {
    return this.createQueryBuilder('users')
      .where('excluded_at IS NULL')
      .getMany()
  },

  async findAll({
    page,
    skip,
    take,
    filters = {}
  }: ISearchParams): Promise<IUserPaginate> {
    const query = this.createQueryBuilder('users').skip(skip).take(take)

    const filterConditions: { [key in keyof typeof filters]?: string } = {
      name: 'users.name ILIKE :name',
      email: 'users.email ILIKE :email',
      excluded:
        filters.escluded === 'true'
          ? 'users.excluded_at IS NOT NULL'
          : 'users.excluded_at IS NULL'
    }

    Object.keys(filters).forEach((key) => {
      const condition = filterConditions[key]
      if (condition) {
        const paramValue =
          key === 'name' || key == 'email' ? `%${filters[key]}%` : filters[key]
        query.andWhere(condition, { [key]: paramValue })
      }
    })

    if (filters.orderBy && filters.orderBy.length > 0) {
      const filtersOrder = new Set([filters.orderBy])
      const orderFields = new Set(['name', 'created_at', 'excluded_at'])
      filtersOrder.forEach((orderField: string, listUsers: number) => {
        if (orderFields.has(orderField)) {
          query.addOrderBy(
            `users.${orderField}`,
            filters.order?.toUpperCase() || 'ASC'
          )
        }
      })
    }
    const [users, count] = await query.getManyAndCount()
    return {
      total: count,
      page: Math.ceil(count / take),
      per_page: take,
      data: users
    }
  }
})
