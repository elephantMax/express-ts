import mongoose from 'mongoose'

export interface User {
  login: string
  password: string
  name: string
  about?: string
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
    name: {
      type: String,
      required: true,
    },
    about: {
      type: String,
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
