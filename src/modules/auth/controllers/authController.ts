import { Request, Response } from 'express'
import AuthServiceInterface from '@auth/interfaces/AuthControllerInterface'
import controllerResponseError from '@errors/ConttrollerResponseError'

export default class AuthController {
  constructor(private authService: AuthServiceInterface) {}

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body
      const authenticated = await this.authService.login({ email, password })
      res.status(200).json(authenticated)
    } catch (error) {
      controllerResponseError(res, error, 'oops, Unable to login')
    }
  }
}
