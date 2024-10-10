import { Router } from 'express'
import { UsersController } from '@users/controllers/UserControllers'

const userRouter = Router()
const userControllers = new UsersController()

userRouter.get('/:id', userControllers.findById)

export default userRouter
