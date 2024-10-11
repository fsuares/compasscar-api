import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import OrdersController from '@controllers/OrdersController'

const ordersRouter = Router()
const ordersController = new OrdersController()

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      car_id: Joi.string().uuid().required(),
      cep: Joi.string().required(),
      city: Joi.string().required(),
      uf: Joi.string().required(),
      start_date: Joi.date().required(),
      end_date: Joi.date().required()
    }
  }),
  ordersController.create
)

export default ordersRouter
