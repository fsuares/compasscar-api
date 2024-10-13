import 'reflect-metadata'
import 'express-async-errors'
import cors from 'cors'
import express, { Router, Request, Response, NextFunction } from 'express'
import { errors } from 'celebrate'
import AppError from '@errors/AppError'
import userRouter from '@users/routes/UserRoutes'
import ordersRouter from '@orders/routes/OrderRoutes'
import customersRouter from '@customers/routes/CustomersRoutes'
import authRouter from '@auth/routes/authRoutes'
import authMiddleware from '@auth/middlewares/authMiddleware'
import carsRouter from '@cars/routes/CarsRoutes'

export const app = express()
const routes = Router()

app.use(express.json())
app.use(cors())

routes.use('/cars', authMiddleware, carsRouter)
routes.use('/users', authMiddleware, userRouter)
routes.use('/orders', authMiddleware, ordersRouter)
routes.use('/customers', authMiddleware, customersRouter)
routes.use('/auth', authRouter) // rota publica sem proteção

app.use(routes)

app.use(errors())

app.use(
  (
    error: any | Error,
    _req: Request,
    res: Response,
    next: NextFunction
  ): any => {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: 'error',
        message: error.message
      })
    }

    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
)
