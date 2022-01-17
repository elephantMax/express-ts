import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import ApiError from '../exceptions/api-error'
import userService from '../services/UserService'

class AuthController {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка валидации', errors.array()))
      }
      const response = await userService.createUser(req.body)
      res.cookie('refreshToken', response.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  async signin(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await userService.login(req.body)

      res.cookie('refreshToken', response.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })

      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies
      const token = await userService.logout(refreshToken)
      res.clearCookie('refreshToken')

      res.json(token)
    } catch (error) {
      next(error)
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies

      const response = await userService.refreshToken(refreshToken)

      res.cookie('refreshToken', response.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })

      res.json(response)
    } catch (error) {
      next(error)
    }
  }
}

export default new AuthController()
