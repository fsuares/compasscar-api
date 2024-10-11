import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import isValidCpf from '@customers/middlewares/isValidCpf'
import CustomersController from '@customers/controllers/CustomersController'

const customersRouter = Router()
const customersController = new CustomersController()

customersRouter.get('/', customersController.index)

customersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      birth_date: Joi.date().iso().min('1910-01-01').max('now').required(),
      cpf: Joi.string()
        .pattern(/^\d{9}-\d{2}$/)
        .required()
        .messages({
          'string.pattern.base': 'The CPF must be in the format 123123123-99.'
        }),
      email: Joi.string().email().required(),
      phone: Joi.string()
        .pattern(/^[0-9()+\-\s]+$/)
        .required()
        .messages({
          'string.pattern.base':
            '"phone" must contain only numbers and allowed characters (+, -, (), space).'
        })
    }
  }),
  isValidCpf,
  customersController.create
)

customersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  customersController.show
)

customersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  customersController.delete
)

export default customersRouter
