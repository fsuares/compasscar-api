import { Request, Response } from 'express'
import AppError from '@errors/AppError'
import AuthServiceInterface from '../interface/controller-auth.interface'
import controllerResponseError from '@errors/controller-response.error'

export default class AuthController {
  constructor(private authService: AuthServiceInterface) {}

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body
      const jwtSecret = process.env.JWT_SECRET as string
      if (!jwtSecret) {
        throw new AppError('JWT_SECRET is not defined', 500)
      }
      const authenticated = await this.authService.login({ email, password })
      res.status(200).json(authenticated)
    } catch (error) {
      controllerResponseError(res, error, 'oops, Unable to login')
    }
  }
}
