import { NextFunction, Request, Response } from 'express'
import ApiError from '../exceptions/api-error'
import TokenService from '../services/TokenService'

export const authMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers['authorization']

    if (!authHeader) {
      return next(ApiError.UnauthorizedError())
    }

    const accessToken = authHeader.split(' ')[1]

    if (!accessToken) {
      return next(ApiError.UnauthorizedError())
    }

    const userData = TokenService.validateAccessToken(accessToken)

    if (!userData) {
      return next(ApiError.UnauthorizedError())
    }

    req.user = userData

    next()
  } catch (error) {
    return next(ApiError.UnauthorizedError())
  }
}
