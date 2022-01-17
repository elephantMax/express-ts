import mongoose, { ObjectId } from 'mongoose'

export interface Token {
  user: ObjectId
  refreshToken: string
}

const schema = new mongoose.Schema<Token>(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
)

export default mongoose.model('Token', schema)
