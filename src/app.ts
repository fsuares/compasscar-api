import 'reflect-metadata'
import 'express-async-errors'
import cors from 'cors'
import express, { Router, Request, Response, NextFunction } from 'express'
import { errors } from 'celebrate'
import AppError from '@errors/AppError'
import carsRouter from '@cars/routes/cars.routes'
import userRouter from '@users/routes/user.routes'
import UserSeed from 'seed/UserSeed'
import ordersRouter from '@orders/routes/order.routes'
import customersRouter from '@customers/routes/CustomersRoutes'

export const app = express()
const routes = Router()

app.use(express.json())
app.use(cors())
app.use(UserSeed.execute)

routes.use('/cars', carsRouter)
routes.use('/users', userRouter)
routes.use('/orders', ordersRouter)
routes.use('/customers', customersRouter)

app.use(routes)

app.use(errors())

app.use(
  (error: Error, _req: Request, res: Response, next: NextFunction): any => {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: 'error',
        message: error.message
      })
    } else {
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      })
    }
  }
)
