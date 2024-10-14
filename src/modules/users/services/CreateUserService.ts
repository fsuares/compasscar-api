import AppError from '@errors/AppError'
import BadRequestError from '@errors/BadRequest'
import { ICreateUser } from '@users/interface/UserInterfaces'
import { UsersRepository } from '@users/repositories/UsersRepository'
import { validateInput } from '@users/utils/ValidateInput'
import { hash } from 'bcrypt'

export class CreateUserService {
  public async execute({
    name,
    email,
    password
  }: ICreateUser): Promise<String> {
    const validationErrors = validateInput({ name, email, password })
    if (validationErrors.length > 0) {
      throw new BadRequestError(validationErrors.join(', '))
    }
    const emailExists = await UsersRepository.findByEmailAndExcludedAt(email)
    if (emailExists.length > 0) {
      throw new AppError('email address already used.', 409)
    }
    const hashedPassword = await hash(password, 8)
    const user = UsersRepository.create({
      name,
      email,
      password: hashedPassword
    })
    await UsersRepository.save(user)
    return user.id
  }
}
