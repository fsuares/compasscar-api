import 'dotenv/config'
import { UsersRepository } from '@users/repositories/UsersRepository'
import { CreateUserService } from '@users/services/CreateUserService'

export default class UserSeed {
  static async execute() {
    const existingUser = await UsersRepository.findByEmailAndExcludedAt(
      process.env.DEFAULT_USER_EMAIL as string
    )
    if (existingUser.length > 0) {
      console.log('User already exists, skipping seed.')
      return
    }

    const name = process.env.DEFAULT_USER_NAME as string
    const email = process.env.DEFAULT_USER_EMAIL as string
    const password = process.env.DEFAULT_USER_PASSWORD as string

    const userService = new CreateUserService()

    try {
      await userService.execute({ email, name, password })
      console.log('User seed executed with success!')
    } catch (error) {
      console.log(`User seed executed with error:`, error)
    }
  }
}
