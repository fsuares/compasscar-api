import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import AuthServiceInterface, {
  UserLogin,
  Authenticated
} from '../interfaces/AuthControllerInterface'
import AppError from '@errors/AppError'
import { UsersRepository } from '@users/repositories/UsersRepository'

export default class AuthService implements AuthServiceInterface {
  async login(user: UserLogin): Promise<Authenticated> {
    const userRepository = await UsersRepository.findByEmail(user.email)

    if (!userRepository.length || userRepository[0].excluded_at) {
      throw new AppError('invalid email or password', 401)
    }

    const isPasswordValid = await bcrypt.compare(
      user.password,
      userRepository[0].password
    )

    if (!isPasswordValid) {
      throw new AppError('invalid email or password', 401)
    }

    const jwtSecret = process.env.JWT_SECRET as string
    const token = jwt.sign({ id: userRepository[0].id }, jwtSecret, {
      expiresIn: process.env.JWT_EXPIRES_IN || '10m'
    })
    const data = jwt.decode(token) as JwtPayload
    const expiresIn = data.exp as number

    return {
      token,
      expiresIn
    }
  }
}
