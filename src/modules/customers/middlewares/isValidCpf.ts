import AppError from '@errors/AppError'
import { NextFunction, Request, Response } from 'express'

export default function isValidCpf(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { cpf } = req.body

  if (!cpf) {
    return next()
  }

  const numericCpf = cpf.replace('-', '')

  const cpfDigits = numericCpf.split('').map(Number)

  if (cpfDigits.every((digit: number) => digit === cpfDigits[0])) {
    throw new AppError(
      'The CPF digits cannot all be the same, send a valid CPF',
      400
    )
  }

  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += cpfDigits[i] * (10 - i)
  }
  let firstVerifier = (sum * 10) % 11
  firstVerifier =
    firstVerifier === 10 || firstVerifier === 11 ? 0 : firstVerifier

  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += cpfDigits[i] * (11 - i)
  }
  let secondVerifier = (sum * 10) % 11
  secondVerifier =
    secondVerifier === 10 || secondVerifier === 11 ? 0 : secondVerifier

  if (firstVerifier === cpfDigits[9] && secondVerifier === cpfDigits[10]) {
    return next()
  } else {
    throw new AppError('Invalid CPF, enter a valid CPF', 400)
  }
}
