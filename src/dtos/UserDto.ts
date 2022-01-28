import { ObjectId } from 'mongoose'

class UserDto {
  login: string
  id: ObjectId
  avatar: ObjectId
  name: string
  about: string

  constructor(model: any) {
    this.login = model.login
    this.id = model._id
    this.avatar = model.avatar
    this.name = model.name
    this.about = model.about
  }
}

export default UserDto
