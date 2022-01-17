import mongoose from 'mongoose'

export interface User {
  login: string
  password: string
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
    token: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
)

export default mongoose.model('User', schema)
