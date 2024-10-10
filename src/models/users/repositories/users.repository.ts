import { User } from '@users/entities/User'
import { dataSource } from '@database/data-source'

export const UsersRepository = dataSource.getRepository(User).extend({
  async findById(id: string) {
    const user = await this.findOne({
      where: {
        id
      }
    })
    return user
  },

  async findByEmail(email: string) {
    const user = await this.findOne({
      where: {
        email
      }
    })
    return user
  }
})
