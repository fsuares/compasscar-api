import AppError from '@errors/AppError'
import BadRequestError from '@errors/BadRequest'
import { IUpdateUser } from '@users/interface/UserInterfaces'
import { UsersRepository } from '@users/repositories/UsersRepository'
import { validateInput } from '@users/utils/ValidateInput'
import { compare, hash } from 'bcrypt'

export class UpdateUserService {
  public async execute({
    id,
    name,
    email,
    password,
    oldPassword
  }: IUpdateUser) {
    const user = await UsersRepository.findByIdAndExcludedAt(id)
    const validationErrors = validateInput({ name, email, password }, true)

    if (validationErrors.length > 0) {
      throw new BadRequestError(validationErrors.join(', '))
    }
    if (!user || user.created_at === null) {
      throw new AppError('user not found!', 404)
    }
    const emailExists = await UsersRepository.findByEmailAndExcludedAt(email)
    if (emailExists.length > 0) {
      throw new AppError('email address already used.', 409)
    }

    if (password && !oldPassword) {
      throw new AppError('old password is required')
    }

    if (password && oldPassword) {
      const checkOldPassword = await compare(oldPassword, user.password)
      if (!checkOldPassword) {
        throw new AppError('old password does not match.')
      }

      user.password = await hash(password, 8)
    }

    user.name = name
    user.email = email
    await UsersRepository.save(user)

    Reflect.deleteProperty(user, 'password')
    return user
  }
}
