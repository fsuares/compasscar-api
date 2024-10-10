import { Router } from 'express'
import AuthController from '../controllers/authController'
import { celebrate, Joi, Segments } from 'celebrate'
import { AuthRepository } from '../repositories/authRepository'

const authRouter = Router()
const authController = new AuthController(AuthRepository)

authRouter.post(
  '/login',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required()
    })
  }),
  (req, res) => authController.login(req, res)
)

export default authRouter
