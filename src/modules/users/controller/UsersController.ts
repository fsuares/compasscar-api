import { Request, Response } from 'express'
import { FindyByIdUserService } from '@users/services/FindByIdUserService'
import { CreateUserService } from '@users/services/CreateUserService'
import { UpdateUserService } from '@users/services/UpdateUserService'
import { DeleteUserService } from '@users/services/DeleteUserService'
import { ListUserService } from '@users/services/ListUserService'
import { IUsersResponse } from '@users/interface/UserInterfaces'

export class UsersController {
  public async create(req: Request, res: Response): Promise<string | any> {
    const createUser = new CreateUserService()
    const { name, email, password } = req.body
    const userId = await createUser.execute({ name, email, password })
    return res.status(201).json({ userId })
  }

  public async findById(req: Request, res: Response): Promise<string | any> {
    const id = req.params.id
    const findyByIdUserService = new FindyByIdUserService()
    const user = await findyByIdUserService.execute(id)
    return res.status(200).json(user)
  }

  public async listUsers(
    req: Request,
    res: Response
  ): Promise<IUsersResponse | any> {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const filters = req.query
    const listUserService = new ListUserService()
    const users = await listUserService.execute({ page, limit, filters })
    return res.status(200).json(users)
  }

  public async update(req: Request, res: Response): Promise<string | any> {
    const id = req.params.id
    const { name, email, password } = req.body
    await new UpdateUserService().execute({
      id,
      name,
      email,
      password
    })
    return res.status(204).send()
  }

  public async delete(req: Request, res: Response): Promise<string | any> {
    const id = req.params.id
    await new DeleteUserService().execute(id)
    return res.status(204).send()
  }
}
