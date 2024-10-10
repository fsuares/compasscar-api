import AppError from '@errors/AppError'
import controllerResponseError from '@errors/controller-response.error'
import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization
  const token = String(authorization).split(' ')[1]

  if (!token) {
    throw new AppError('token not provided', 401)
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET as string
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
    // req.['userId'] = decoded.sub /// entender esse erro
    req.userId = decoded.sub
    next()
  } catch (error) {
    controllerResponseError(res, error, 'Invalid token')
  }
}
