interface ICreateUser {
  name: string
  email: string
  password: string
}

export function validateInput({
  name,
  email,
  password
}: ICreateUser): string[] {
  const errors = []

  if (!name) errors.push('name is required')
  if (!email) {
    errors.push('email is required')
  }
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  )
  if (!isEmailValid) {
    errors.push('email is invalid')
  }
  console.log('Senha', password)
  if (!password) {
    errors.push('password is required')
  }
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    )
  if (!isPasswordValid) {
    errors.push(
      'password must be at least 8 characters long with letters and numbers'
    )
  }

  return errors
}
