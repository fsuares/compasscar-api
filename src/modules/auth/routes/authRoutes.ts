import { Router } from 'express'
import AuthController from '@auth/controllers/authController'
import { celebrate, isCelebrateError, Joi, Segments } from 'celebrate'
import AuthService from '@auth/services/authService'
import AppError from '@errors/AppError'

const authRouter = Router()
const authService = new AuthService()
const authController = new AuthController(authService)

authRouter.post(
  '/login',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required()
    })
  }),
  (req, res) => authController.login(req, res)
)

authRouter.use((error: Error): any => {
  if (isCelebrateError(error)) {
    console.log('entrou', error)
    const errorMessage =
      error.details.get('params')?.details[0].message || 'Invalid parameters'
    const statusCode = 400
    throw new AppError(errorMessage, statusCode)
  }
})

export default authRouter
