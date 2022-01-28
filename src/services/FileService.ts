import { UploadedFile } from 'express-fileupload'
import fs from 'fs'
import { ObjectId } from 'mongoose'
import { v4 } from 'uuid'
import FileDto from '../dtos/FileDto'
import ApiError from '../exceptions/api-error'
import File, { FileTypes } from '../models/File'

class FileService {
  static storeFile(file: UploadedFile) {
    const ext = file.mimetype.split('/')[1]
    const fullName = `${v4()}.${ext}`
    const filePath = `${__dirname}/../uploads/${fullName}`
    file.mv(filePath)
    return { fullName }
  }

  static async getAll() {
    const files = await File.find({}).lean()
    const fileDtos = files.map((file) => new FileDto(file))
    return fileDtos
  }

  static async getById(id: string) {
    const file = await File.findById(id)
    const fileDto = new FileDto(file)
    return fileDto
  }

  static async create(file: UploadedFile, user: string, type: FileTypes) {
    try {
      const { fullName } = FileService.storeFile(file)
      const fileData = await File.create({
        user,
        src: `/files/${fullName}`,
        type,
        name: fullName,
        md5: file.md5,
      })
      const fileDto = new FileDto(fileData)
      return fileDto
    } catch (error) {
      console.log(error)
      throw ApiError.BadRequest('Ошибка при загрузке файла')
    }
  }

  static async update(file: UploadedFile, fileId: ObjectId) {
    try {
      const fileBefore = await File.findById(fileId)
      if (fileBefore?.md5 === file.md5) {
        throw ApiError.BadRequest('Данный файл идентичен')
      }
      fs.unlinkSync(`${__dirname}/../uploads/${fileBefore?.name}`)
      const { fullName } = FileService.storeFile(file)

      const fileData = await File.findByIdAndUpdate(fileId, {
        src: `/files/${fullName}`,
        name: fullName,
        md5: file.md5,
      })
      const fileDto = new FileDto(fileData)
      return fileDto
    } catch (error: any) {
      throw ApiError.BadRequest(error.message)
    }
  }

  static async remove(id: string) {
    const fileData = await File.findByIdAndRemove(id)
    if (!fileData) {
      throw ApiError.BadRequest('Данного файла не существует')
    }
    fs.unlinkSync(`${__dirname}/../uploads/${fileData.name}`)

    return new FileDto(fileData)
  }
}

export default FileService
