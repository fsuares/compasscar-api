import AppError from '@errors/AppError'
import { UsersController } from '@users/controller/UsersController'
import { celebrate, isCelebrateError, Joi, Segments } from 'celebrate'
import express, { Router, Request, Response, NextFunction } from 'express'

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
userRouter.use(
  (
    error: any | Error,
    _req: Request,
    res: Response,
    next: NextFunction
  ): any => {
    if (isCelebrateError(error)) {
      const errorMessage =
        error.details.get('params')?.details[0].message || 'Invalid parameters'
      const statusCode = 400
      throw new AppError(errorMessage, statusCode)
    }
  }
)
export default userRouter
