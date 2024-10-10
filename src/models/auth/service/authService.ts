import { User } from '@users/entities/User'
import { dataSource } from '@database/data-source'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import AuthServiceInterface, {
  UserLogin,
  Authenticated
} from '../interface/controller-auth.interface'
import AppError from '@errors/AppError'
import { IsNull } from 'typeorm'
import AuthRepositoryInterface from '@auth/interface/repository.auth.interface'
import ChecksTypesAndNull from 'models/utils/checks-types-and-null'

export default class AuthService implements AuthServiceInterface {
  constructor(private authRepository: AuthRepositoryInterface) {}

  async login(user: UserLogin): Promise<Authenticated> {
    if (ChecksTypesAndNull(user.email)) {
      throw new AppError('invalid email or password', 403)
    }

    if (ChecksTypesAndNull(user.password)) {
      throw new AppError('invalid email or password', 403)
    }

    const userRepository = await this.authRepository.getUserActiveByEmail(
      user.email
    )

    if (!userRepository) {
      throw new AppError('Invalid credentials', 401)
    }

    const isPasswordValid = await bcrypt.compare(
      user.password,
      userRepository.password
    )

    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401)
    }

    const jwtSecret = process.env.JWT_SECRET as string
    const token = jwt.sign({ id: userRepository.id }, jwtSecret, {
      expiresIn: '10m'
    })
    const data = jwt.decode(token) as JwtPayload
    const expiresIn = data.exp as number

    return {
      token,
      expiresIn
    }
  }
}
