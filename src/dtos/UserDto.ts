import { ObjectId, Schema } from 'mongoose'

interface UserDtoI {
  login: string
  id: ObjectId
  name: string
  about: string
  avatar: string
}

class UserDto implements UserDtoI {
  login: string
  id: Schema.Types.ObjectId
  avatar: string
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
