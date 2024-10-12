export type User = {
  id: string
  name: string
  email: string
  password: string
  excluded_at: Date
  created_at: Date
  updated_at: Date
}
export type UserCreate = Omit<
  User,
  'id' | 'password' | 'excluded_at' | 'created_at' | 'updated_at'
>

export type IUpdateUser = Omit<
  User,
  'excluded_at' | 'created_at' | 'updated_at'
>
export default interface IUserServiceInterface {
  create(user: UserCreate): Promise<string>
}
