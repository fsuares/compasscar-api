import { User } from '@users/entities/User'
import { dataSource } from '@database/data-source'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import AuthServiceInterface, {
  UserLogin,
  Authenticated
} from '../interface/AuthControllerInterface'
import AppError from '@errors/AppError'
import { IsNull } from 'typeorm'
import AuthRepositoryInterface from '@auth/interface/AuthRepositoryInterface'

export default class AuthService implements AuthServiceInterface {
  constructor(private authRepository: AuthRepositoryInterface) {}

  async login(user: UserLogin): Promise<Authenticated> {
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
