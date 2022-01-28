import { ParamSchema, Schema } from 'express-validator'
import { FileTypes } from '../models/File'

export const fileSchema: ParamSchema = {
  exists: true,
  in: 'body',
  errorMessage: 'Файл обязателен',
}

const typeOptions = Object.values(FileTypes).map((type) => type)

export const typeSchema: ParamSchema = {
  exists: true,
  in: 'body',
  isIn: {
    options: typeOptions,
    errorMessage: `Неверно указано назначение файла. Доступные: ${typeOptions.join(
      ', '
    )}`,
  },
  errorMessage: 'Файл обязателен',
}

export const CreateSchema: Schema = {
  file: fileSchema,
  type: typeSchema,
}
