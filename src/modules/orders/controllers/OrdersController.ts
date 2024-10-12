import { Request, Response } from 'express'
import { CreateOrderService } from '@orders/services/CreateOrderService'
import { UpdateOrderService } from '@orders/services/UpdateOrderService'
import { FindByIdOrderService } from '@orders/services/FindbyOrderService'
import { IOrderResponse } from '@orders/interfaces/OrdersInterface'
import { ShowOrderService } from '@orders/services/ShowOrderService'
import { DeleteOrderService } from '@orders/services/DeleteOrderService'

export default class OrdersController {
  public async create(req: Request, res: Response): Promise<string | any> {
    const { customer_id, car_id, cep, start_date, end_date } = req.body

    const createOrder = new CreateOrderService()

    const order = await createOrder.execute({
      customer_id,
      car_id,
      cep,
      start_date,
      end_date
    })
    return res.status(201).json(order)
  }

  public async show(req: Request, res: Response): Promise<any> {
    const { id } = req.params
    const showOrder = new ShowOrderService()
    const order = await showOrder.execute(id)
    return res.status(200).json(order)
  }

  public async show(req: Request, res: Response): Promise<any> {
    const { id } = req.params
    const showOrder = new ShowOrderService()
    const order = await showOrder.execute(id)
    return res.status(200).json(order)
  }

  public async update(req: Request, res: Response): Promise<any> {
    const { id } = req.params
    const { start_date, end_date, cep, status } = req.body

    const updateOrder = new UpdateOrderService()

    const order = await updateOrder.execute({
      id,
      start_date,
      end_date,
      cep,
      status
    })

    return res.status(200).json(order)
  }

  public async findById(
    req: Request,
    res: Response
  ): Promise<IOrderResponse | any> {
    const { id } = req.params
    const findByIdOrderService = new FindByIdOrderService()
    const order = await findByIdOrderService.execute(id)
    return res.status(201).json(order)
  }

  public async delete(req: Request, res: Response): Promise<any> {
    const { id } = req.params
    await new DeleteOrderService().execute(id)
    return res.status(204).json()
  }
}
