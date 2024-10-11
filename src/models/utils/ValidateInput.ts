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
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    errors.push('email is invalid')
  }

  if (!password) {
    errors.push('password is required')
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    )
  ) {
    errors.push(
      'password must be at least 8 characters long with letters and numbers'
    )
  }

  return errors
}
