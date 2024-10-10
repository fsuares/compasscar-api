// completar após acriar as rotas de usuário para gerar
export default class UserSeed {
  static execute() {
    const userRepository = new UserRepository()
    const userService = new UserService(userRepository)
    const name = process.env.DEFAULT_USER_NAME as string
    const email = process.env.DEFAULT_USER_EMAIL as string
    const password = process.env.DEFAULT_USER_PASSWORD as string
    userService
      .create({ email, name, password })
      .then(() => {
        console.log('User seed executed with success!')
      })
      .catch((error) => {
        console.log(`User sedd executed with error: ${error.message}`)
      })
  }
}
