import { NextFunction, Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import { Schema, ParamSchema } from 'express-validator'
import ApiError from '../exceptions/api-error'

export const loginSchema: ParamSchema = {
  exists: true,
  isString: true,
  isLength: {
    options: {
      min: 3,
      max: 20,
    },
    errorMessage: 'Минимальная длина логина 3, максимальная 20',
  },
}

export const passwordSchema: ParamSchema = {
  exists: true,
  isLength: {
    options: {
      min: 6,
      max: 32,
    },
    errorMessage: 'Минимальная длина пароля 6, максимальная 20',
  },
}

export const aboutSchema: ParamSchema = {
  isLength: {
    options: {
      max: 100,
    },
    errorMessage: 'Максимальная длина описания 100',
  },
  isString: true,
}

export const nameSchema: ParamSchema = {
  exists: true,
  isLength: {
    options: {
      min: 3,
      max: 32,
    },
    errorMessage: 'Минимальная длина имени 3, максимальная 32',
  },
  isString: true,
}

export const avatarValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const avatar = req.files?.avatar as UploadedFile
  if (!avatar) {
    return next()
  }
  const validExtentions = ['jpg', 'jpeg', 'png']
  const ext = avatar.mimetype.split('/')[1]
  if (validExtentions.includes(ext)) {
    return next()
  }
  return next(
    ApiError.BadRequest(
      `Аватар должен быть изображением, доступные форматы: ${validExtentions.join(
        ', '
      )}`
    )
  )
}

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const currentUserId = req.user.id
    const userToUpdateId = req.params.id
    if (currentUserId !== userToUpdateId) {
      return next(
        ApiError.BadRequest('Вы можете редактировать только свой аккаунт')
      )
    }
    return next()
  } catch (error) {
    return next(ApiError.BadRequest('Ошибка сервера'))
  }
}

export const SignUpSchema: Schema = {
  login: loginSchema,
  password: passwordSchema,
  about: aboutSchema,
  name: nameSchema,
}

export const SignInSchema: Schema = {
  login: loginSchema,
  password: passwordSchema,
}

export const UpdateUserSchema: Schema = {
  name: nameSchema,
  about: aboutSchema,
}
