import { Response } from 'express'
import AppError from './AppError'

export default function controllerResponseError(
  res: Response,
  err: unknown,
  message: string = 'internal server error'
) {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message })
    return
  }

  res.status(500).json({
    error: message
  })
}
