import { Router } from 'express'
import { celebrate, isCelebrateError, Joi, Segments } from 'celebrate'
import { NextFunction, Router, Response, Request } from 'express'
import { celebrate, isCelebrateError, Joi, Segments } from 'celebrate'
import isValidCpf from '@customers/middlewares/isValidCpf'
import CustomersController from '@customers/controllers/CustomersController'
import AppError from '@errors/AppError'

const customersRouter = Router()
const customersController = new CustomersController()

customersRouter.get('/', customersController.index)

customersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      birth_date: Joi.custom((value, helpers) => {
        const date = new Date(value)
        const [year, month, day] = value.substring(0, 10).split('-').map(Number)
        if (
          date.getFullYear() !== year ||
          date.getMonth() + 1 !== month ||
          date.getDate() + 1 !== day
        ) {
          return helpers.error('any.invalid')
        }
        return value
      }).required(),
      cpf: Joi.string()
        .pattern(/^\d{9}-\d{2}$/)
        .required()
        .messages({
          'string.pattern.base': 'the CPF must be in the format 123123123-99.'
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
      id: Joi.string().uuid().required().messages({
        'string.base': 'id must be a valid string',
        'string.empty': 'id cannot be empty',
        'string.guid': 'id must be a valid uuid',
        'any.required': 'id is required'
      })
    }
  }),
  customersController.show
)

customersRouter.delete(
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
  customersController.delete
)

customersRouter.patch(
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
      name: Joi.string(),
      birth_date: Joi.custom((value, helpers) => {
        const date = new Date(value)
        const [year, month, day] = value.substring(0, 10).split('-').map(Number)
        if (
          date.getFullYear() !== year ||
          date.getMonth() + 1 !== month ||
          date.getDate() + 1 !== day
        ) {
          return helpers.error('any.invalid')
        }
        return value
      }),
      cpf: Joi.string()
        .pattern(/^\d{9}-\d{2}$/)
        .messages({
          'string.pattern.base': 'the CPF must be in the format 123123123-99.'
        }),
      email: Joi.string().email(),
      phone: Joi.string()
        .pattern(/^[0-9()+\-\s]+$/)
        .messages({
          'string.pattern.base':
            '"phone" must contain only numbers and allowed characters (+, -, (), space).'
        })
    }
  }),
  isValidCpf,
  customersController.update
)
customersRouter.use((error: Error): any => {
  if (isCelebrateError(error)) {
    console.log('entrou', error)
    const errorMessage =
      error.details.get('params')?.details[0].message || 'Invalid parameters'
    const statusCode = 400
    throw new AppError(errorMessage, statusCode)
  }
})

customersRouter.use(
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

export default customersRouter
