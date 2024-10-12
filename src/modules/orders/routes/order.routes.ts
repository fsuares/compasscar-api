import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import OrdersController from '@orders/controllers/OrdersController'
import { OrderStatus } from '@utils/order.status.enum'

const ordersRouter = Router()
const ordersController = new OrdersController()

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      car_id: Joi.string().uuid().required(),
      cep: Joi.string().required(),
      start_date: Joi.date().required(),
      end_date: Joi.date().required()
    }
  }),
  ordersController.create
)

ordersRouter.patch(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  celebrate({
    [Segments.BODY]: {
      cep: Joi.string(),
      end_date: Joi.date(),
      start_date: Joi.date(),
      status: Joi.string().valid(...Object.values(OrderStatus))
    }
  }),
  ordersController.update
)

export default ordersRouter
