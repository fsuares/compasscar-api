import { Router } from 'express'
import AuthController from '../controllers/AuthController'
import { celebrate, Joi, Segments } from 'celebrate'
import AuthService from '@auth/service/authService'

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

export default authRouter
