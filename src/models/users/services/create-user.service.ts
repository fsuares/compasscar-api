import AppError from '@errors/AppError'
import { User } from '@users/entities/User'
import { UsersRepository } from '@users/repositories/users.repository'
import { hashSync } from 'bcrypt'

interface IRequest {
  name: string
  email: string
  password: string
}

export class CreateUserService {
  public async execute({
    name,
    email,
    password
  }: IRequest): Promise<User | AppError> {
    const emailExists = await UsersRepository.findByEmail(email)
    if (emailExists) {
      throw new AppError('email address already used.', 409)
    }

    const hashedPassword = await hashSync(password, 8)

    const user = UsersRepository.create({
      name,
      email,
      password: hashedPassword
    })

    await UsersRepository.save(user)
    return user
  }
}
