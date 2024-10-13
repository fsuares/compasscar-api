import { NextFunction, Router, Response, Request } from 'express'
import { celebrate, isCelebrateError, Joi, Segments } from 'celebrate'
import OrdersController from '@orders/controllers/OrdersController'
import { OrderStatus } from '@utils/order.status.enum'
import AppError from '@errors/AppError'

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

ordersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  ordersController.show
)

ordersRouter.patch(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required().messages({
        'string.base': 'id must be a valid string',
        'string.empty': 'id cannot be empty',
        'string.guid': 'id must be a valid uuid',
        'any.required': 'id is required'
      })
    },
    [Segments.BODY]: {
      cep: Joi.string(),
      end_date: Joi.date(),
      start_date: Joi.date(),
      status: Joi.string().valid(...Object.values(OrderStatus))
    }
  }),
  ordersController.update
)
ordersRouter.use(
  (error: Error, _req: Request, res: Response, next: NextFunction) => {
    if (isCelebrateError(error)) {
      const errorDetails =
        error.details.get('params') ||
        error.details.get('body') ||
        error.details.get('query')
      if (errorDetails) {
        const errorMessage = errorDetails.details[0].message
        const statusCode = 400
        throw new AppError(errorMessage, statusCode)
      }
    }
    next(error)
  }
)

ordersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  ordersController.delete
)

export default ordersRouter
