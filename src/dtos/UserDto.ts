import { ObjectId, Schema } from 'mongoose'

interface UserDtoI {
  login: string
  id: ObjectId
}

class UserDto implements UserDtoI {
  login: string
  id: Schema.Types.ObjectId

  constructor(model: any) {
    this.login = model.login
    this.id = model._id
  }
}

export default UserDto
