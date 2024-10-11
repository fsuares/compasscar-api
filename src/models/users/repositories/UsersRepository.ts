import { dataSource } from '@database/data-source'
import { User } from '@users/entities/User'

export const UsersRepository = dataSource.getRepository(User).extend({
  async findByID(id: string) {
    return this.createQueryBuilder('users')
      .where('users.id = :id', { id })
      .getOne()
  }
})
