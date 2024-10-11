import { UsersController } from '@users/controller/UsersController'
import { Router } from 'express'

const userRouter = Router()
const userControllers = new UsersController()

userRouter.post('/', userControllers.create)
userRouter.get('/:id', userControllers.findById)

export default userRouter
