import { NextFunction, Router, Response, Request } from 'express'
import { celebrate, isCelebrateError, Joi, Segments } from 'celebrate'
import { itemsUnique } from '@cars/middlewares/itemsUnique'
import CarsController from '@cars/controllers/CarsController'
import { CarStatus } from '@utils/car.status.enum'
import { yearMax, yearMin } from '@cars/utils/year'
import AppError from '@errors/AppError'

const carsRouter = Router()
const carsController = new CarsController()

carsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      license_plate: Joi.string().required(),
      brand: Joi.string().required(),
      model: Joi.string().required(),
      year: Joi.number().min(yearMin).max(yearMax).required(),
      km: Joi.number().required(),
      price: Joi.number().required(),
      items: Joi.array()
        .items(Joi.string())
        .max(5)
        .custom(itemsUnique)
        .messages({
          'array.unique': 'Items must be unique',
          'array.max': 'Items must have a maximum of 5'
        })
        .required()
    }
  }),
  carsController.create
)

carsRouter.get('/', carsController.index)

carsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required().messages({
        'string.base': 'id must be a valid string',
        'string.empty': 'id cannot be empty',
        'string.guid': 'id must be a valid uuid',
        'any.required': 'id is required'
      })
    }
  }),
  carsController.show
)

carsRouter.patch(
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
      license_plate: Joi.string(),
      brand: Joi.string(),
      model: Joi.string(),
      year: Joi.number(),
      km: Joi.number(),
      price: Joi.number(),
      items: Joi.array()
        .items(Joi.string())
        .max(5)
        .custom(itemsUnique)
        .messages({
          'array.unique': 'Items must be unique',
          'array.max': 'Items must have a maximum of 5'
        }),
      status: Joi.string()
        .valid(CarStatus.ACTIVE, CarStatus.INACTIVE)
        .messages({ 'any.only': 'Invalid status' })
    }
  }),
  carsController.update
)

carsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required().messages({
        'string.base': 'id must be a valid string',
        'string.empty': 'id cannot be empty',
        'string.guid': 'id must be a valid uuid',
        'any.required': 'id is required'
      })
    }
  }),
  carsController.delete
)

carsRouter.use(
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

carsRouter.use(
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

export default carsRouter
