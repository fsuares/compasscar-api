import { Request, Response } from 'express'
import errorResponse from '@errors/ErrorResponse'
import { FindyByIdUserService } from '@users/services/FindyByIdUserService'
import { CreateUserService } from '@users/services/CreateUserService'
import AppError from '@errors/AppError'

export class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createUser = new CreateUserService()
    const { name, email, password } = req.body

    try {
      const userId = await createUser.execute({ name, email, password })
      return res.status(201).json(userId)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message })
      }
      return res.status(500).json({ error: 'internal server error' })
    }
  }

  public async findById(req: Request, res: Response): Promise<any> {
    const id = req.params.id
    const findyByIdUserService = new FindyByIdUserService()
    const user = await findyByIdUserService.execute(id)

    return res.status(200).json(user)
  }
}
