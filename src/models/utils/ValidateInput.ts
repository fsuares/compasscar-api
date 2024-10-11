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
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    errors.push('email is invalid')
  }
  if (
    password.length < 6 ||
    !/\d/.test(password) ||
    !/[a-zA-Z]/.test(password)
  ) {
    errors.push(
      'password must be at least 6 characters long with letters and numbers'
    )
  }

  return errors
}
