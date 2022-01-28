import { NextFunction, Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import ApiError from '../exceptions/api-error'
import FileService from '../services/FileService'
import { validationResult } from 'express-validator'

class FileController {
  static async getAll(req: Request, res: Response) {
    const response = await FileService.getAll()
    res.json(response)
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка валидации', errors.array()))
      }
      if (!req.files) {
        return next(ApiError.BadRequest('Нет файлов'))
      }
      const uploadedFile = req.files.file as UploadedFile
      const { id } = req.user
      const response = await FileService.create(uploadedFile, id, req.body.type)
      res.json(response)
    } catch (error) {
      return next(error)
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const fileData = await FileService.remove(id)
      res.json(fileData)
    } catch (error) {
      next(error)
    }
  }
}

export default FileController
