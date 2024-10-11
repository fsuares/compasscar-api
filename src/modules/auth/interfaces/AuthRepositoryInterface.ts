import { User } from '@users/entities/User'

export default interface AuthRepositoryInterface {
  getUserActiveByEmail(email: string): Promise<User | undefined>
}
