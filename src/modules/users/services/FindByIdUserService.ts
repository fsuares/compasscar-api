import AppError from '@errors/AppError'
import { UsersRepository } from '@users/repositories/UsersRepository'

export class FindyByIdUserService {
  public async execute(id: string) {
    const user = await UsersRepository.findByID(id)
    if (!user) {
      throw new AppError('user not found!', 404)
    }
    Reflect.deleteProperty(user, 'password')
    return user
  }
}
