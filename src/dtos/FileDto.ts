import { ObjectId } from 'mongoose'
import { FileTypes } from '../models/File'

class FileDto {
  id: string
  src: string
  user: ObjectId
  type: FileTypes
  name: string
  md5: string

  constructor(model: any) {
    this.id = model._id
    this.src = model.src
    this.user = model.user
    this.type = model.type
    this.name = model.name
    this.md5 = model.md5
  }
}

export default FileDto
