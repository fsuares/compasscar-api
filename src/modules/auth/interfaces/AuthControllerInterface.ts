export type UserLogin = {
  email: string
  password: string
}

export type Authenticated = {
  token: string
  expiresIn: number
}

export default interface AuthServiceInterface {
  login(user: UserLogin): Promise<Authenticated>
}
