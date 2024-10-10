import { dataSource } from '@database/data-source'
import { User } from '@users/entities/User'

export const AuthRepository = dataSource.getRepository(User).extend({
  getUserByEmailActive(email: string) {
    return this.createQueryBuilder('users')
      .where('email = :email', { email })
      .andWhere('excluded_at IS NULL')
      .getOne()
  }
})
