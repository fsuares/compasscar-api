import AppError from '@errors/AppError'
import { UsersRepository } from '@users/repositories/UsersRepository'

export class DeleteUserService {
  public async execute(id: string) {
    const user = await UsersRepository.findByID(id)
    if (!user) {
      throw new AppError('user not found!', 404)
    }
    if (user.excluded_at) {
      throw new AppError('user not found or excluded', 404)
    }
    await UsersRepository.userSoftDelete(id, new Date())
  }
}
