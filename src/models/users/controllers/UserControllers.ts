/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { FindyByIdUserService } from '@users/services/FindByIdUsersService'

export class UsersController {
  public async findById(req: Request, res: Response): Promise<any> {
    const id = req.params.id
    const findyByIdUserService = new FindyByIdUserService()
    const user = await findyByIdUserService.execute(id)

    return res.status(200).json(user)
  }
}
