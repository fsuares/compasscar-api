import AppError from './AppError'

export default class BadRequestError extends AppError {
  constructor(public message: string) {
    super(message, 400)
  }
}
