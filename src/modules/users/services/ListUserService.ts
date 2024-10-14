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
    let { data, total } = await UsersRepository.findAll({
      page,
      skip,
      take,
      filters
    })

    const users = data.map((user) => ({
      id: user.id,
      name: user.name,
      excluded_at: user.excluded_at,
      created_at: user.created_at,
      updated_at: user.updated_at
    }))

    if (data.length === 0) {
      throw new AppError('users not found', 404)
    }

    return {
      total,
      page: page,
      limit: take,
      data: users
    }
  }
}
