import { UsersController } from '@users/controller/UsersController'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { Request, Response } from 'express'

const userRouter = Router()
const userControllers = new UsersController()

userRouter.post('/', userControllers.create)
userRouter.get('/:id', userControllers.findById)
userRouter.patch('/:id', userControllers.update)

export default userRouter
