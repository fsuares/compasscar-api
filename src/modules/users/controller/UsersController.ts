import { Request, Response } from 'express'
import { FindyByIdUserService } from '@users/services/FindyByIdUserService'
import { CreateUserService } from '@users/services/CreateUserService'
import { UpdateUserService } from '@users/services/UpdateUserService'
import { ListUserService } from '@users/services/ListUserService'

export class UsersController {
  public async create(req: Request, res: Response): Promise<string | any> {
    const createUser = new CreateUserService()
    const { name, email, password } = req.body

    const userId = await createUser.execute({ name, email, password })
    return res.status(201).json(userId)
  }

  public async findById(req: Request, res: Response): Promise<string | any> {
    const id = req.params.id
    const findyByIdUserService = new FindyByIdUserService()
    const user = await findyByIdUserService.execute(id)
    return res.status(200).json(user)
  }

  public async listUsers(req: Request, res: Response): Promise<any> {
    const listUserService = new ListUserService()
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const filters = req.query
    const users = await listUserService.execute({ page, limit, filters })
    return res.status(200).json(users)
  }

  public async update(req: Request, res: Response): Promise<string | any> {
    const id = req.params.id
    const { name, email, password } = req.body
    const updateUser = new UpdateUserService()
    await updateUser.execute({ id, name, email, password })
    return res.status(204).json({})
  }
}
