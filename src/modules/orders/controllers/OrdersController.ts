import { Request, Response } from 'express'
import { CreateOrderService } from '@orders/services/CreateOrderService'

export default class OrdersController {
  public async create(req: Request, res: Response): Promise<any> {
    const { customer_id, car_id, cep, city, uf, start_date, end_date } =
      req.body

    const createOrder = new CreateOrderService()

    const order = await createOrder.execute({
      customer_id,
      car_id,
      cep,
      city,
      uf,
      start_date,
      end_date
    })
    return res.status(201).json(order)
  }
}
