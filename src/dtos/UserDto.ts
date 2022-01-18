import { ObjectId, Schema } from 'mongoose'

interface UserDtoI {
  login: string
  id: ObjectId
  avatar: string
}

class UserDto implements UserDtoI {
  login: string
  id: Schema.Types.ObjectId
  avatar: string

  constructor(model: any) {
    this.login = model.login
    this.id = model._id
    this.avatar = model.avatar
  }
}

export default UserDto
