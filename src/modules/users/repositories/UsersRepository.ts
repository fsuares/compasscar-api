import { dataSource } from '@database/data-source'
import { User } from '@users/entities/User'

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

  async userSoftDelete(id: string, date: Date) {
    return this.createQueryBuilder('users')
      .update(User)
      .set({
        excluded_at: date
      })
      .where('id = :id', { id })
      .execute()
  }
})
