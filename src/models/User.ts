import mongoose from 'mongoose'

export interface User {
  login: string
  password: string
  avatar?: string
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
    avatar: {
      type: String,
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
