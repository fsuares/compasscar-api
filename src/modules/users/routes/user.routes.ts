import AppError from '@errors/AppError'
import { UsersController } from '@users/controller/UsersController'
import { celebrate, isCelebrateError, Joi, Segments } from 'celebrate'
import { Router } from 'express'

const userRouter = Router()
const userControllers = new UsersController()

userRouter.get('/', userControllers.listUsers)

userRouter.post('/', userControllers.create)

userRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  userControllers.findById
)

userRouter.patch(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  userControllers.update
)

userRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  userControllers.delete
)

userRouter.use((error: Error): any => {
  if (isCelebrateError(error)) {
    console.log('entrou', error)
    const errorMessage =
      error.details.get('params')?.details[0].message || 'Invalid parameters'
    const statusCode = 400
    throw new AppError(errorMessage, statusCode)
  }
})
export default userRouter
