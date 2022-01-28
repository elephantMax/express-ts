import mongoose, { ObjectId, Schema } from 'mongoose'

export interface User {
  login: string
  password: string
  name: string
  about?: string
  avatar?: ObjectId
  token?: string
}

const schema = new mongoose.Schema<User>(
  {
    login: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    about: {
      type: String,
    },
    avatar: {
      type: Schema.Types.ObjectId,
      ref: 'File',
    },
    token: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
)

export default mongoose.model('User', schema)
