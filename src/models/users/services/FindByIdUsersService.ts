import { User } from '@users/entities/User'
import { UsersRepository } from '@users/repositories/UsersRepository'

export class FindyByIdUserService {
  public async execute(id: string) {
    const user = await UsersRepository.findByID(id)
    return user
  }
}
