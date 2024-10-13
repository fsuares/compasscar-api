import AppError from '@errors/AppError'
import { IListRequest, IUserPaginate } from '@users/interface/UserInterfaces'
import { UsersRepository } from '@users/repositories/UsersRepository'

export class ListUserService {
  public async execute({
    page,
    limit,
    filters
  }: IListRequest): Promise<IUserPaginate> {
    const take = limit
    const skip = (Number(page) - 1) * take
    const users = await UsersRepository.findAll({
      page,
      skip,
      take,
      filters
    })

    if (users.data.length === 0) {
      throw new AppError('users not found', 404)
    }
    return users
  }
}
