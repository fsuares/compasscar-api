interface ICreateUser {
  name?: string
  email?: string
  password?: string
}

function isEmpty(value: string | undefined): boolean {
  return !value
}

function isEmailValid(email: string): boolean {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
}

function isPasswordValid(password: string): boolean {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?]).{8,}$/.test(
    password
  )
}

export function validateInput(
  { name, email, password }: ICreateUser,
  isUpdate: boolean = false
): string[] {
  const errors: string[] = []

  const validations = [
    { condition: !isUpdate && isEmpty(name), message: 'name is required' },
    {
      condition: name && name.length < 3,
      message: 'name must be at least 3 characters long'
    },
    { condition: !isUpdate && isEmpty(email), message: 'email is required' },
    { condition: email && !isEmailValid(email), message: 'email is invalid' },
    {
      condition: !isUpdate && isEmpty(password),
      message: 'password is required'
    },
    {
      condition: password && !isPasswordValid(password),
      message:
        'password must be at least 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character'
    }
  ]

  validations.forEach((validation) => {
    if (validation.condition) {
      errors.push(validation.message)
    }
  })

  return errors
}
