import AppError from '@errors/AppError'
import { UsersController } from '@users/controller/UsersController'
import { celebrate, isCelebrateError, Joi, Segments } from 'celebrate'
import { NextFunction, Router, Response, Request } from 'express'

const userRouter = Router()
const userControllers = new UsersController()

userRouter.post('/', userControllers.create)

userRouter.get(
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
  userControllers.findById
)

userRouter.get('/', userControllers.listUsers)

userRouter.patch(
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
  userControllers.update
)

userRouter.delete(
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
  userControllers.delete
)

userRouter.use(
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

export default userRouter
