export type User = {
  id: string
  name: string
  email: string
  password: string
  excluded_at: Date
  created_at: Date
  updated_at: Date
}

export interface ICreateUser
  extends Omit<User, 'id' | 'excluded_at' | 'created_at' | 'updated_at'> {}

export interface IUpdateUser
  extends Omit<User, 'excluded_at' | 'created_at' | 'updated_at'> {}
