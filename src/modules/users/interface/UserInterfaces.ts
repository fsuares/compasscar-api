export type UserCreate = {
  name: string
  email: string
  password: string
}
export default interface IUserServiceInterface {
  create(user: UserCreate): Promise<string>
}
