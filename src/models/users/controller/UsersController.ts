import { Request, Response } from 'express'
import { FindyByIdUserService } from '@users/services/FindyByIdUserService'
import { CreateUserService } from '@users/services/CreateUserService'

export class UsersController {
  public async create(req: Request, res: Response): Promise<any> {
    const createUser = new CreateUserService()
    const { name, email, password } = req.body
    const userId = await createUser.execute({ name, email, password })
    return res.status(201).json(userId)
  }

  public async findById(req: Request, res: Response): Promise<any> {
    const id = req.params.id
    const findyByIdUserService = new FindyByIdUserService()
    const user = await findyByIdUserService.execute(id)
    return res.status(200).json(user)
  }
}
