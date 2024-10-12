import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { itemsUnique } from '@cars/middlewares/itemsUnique'
import CarsController from '@cars/controllers/CarsController'
import { CarStatus } from '@utils/car.status.enum'

const carsRouter = Router()
const carsController = new CarsController()

carsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      license_plate: Joi.string().required(),
      brand: Joi.string().required(),
      model: Joi.string().required(),
      year: Joi.number().required(),
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
      id: Joi.string().uuid().required()
    }
  }),
  carsController.show
)

carsRouter.patch(
  '/:id',
  celebrate({
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
        .valid(CarStatus.ATIVO, CarStatus.INATIVO)
        .messages({ 'any.only': 'Invalid status' })
    }
  }),
  carsController.update
)

carsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  carsController.delete
)

export default carsRouter
