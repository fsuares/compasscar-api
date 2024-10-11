import { UsersController } from '@users/controller/UsersController'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'

const userRouter = Router()
const userControllers = new UsersController()

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

export default userRouter
