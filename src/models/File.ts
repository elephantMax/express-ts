import mongoose, { model, ObjectId, Schema } from 'mongoose'

export interface File {
  src: string
  user: ObjectId
}

const schema = new Schema<File>(
  {
    src: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    versionKey: false,
  }
)

export default model('File', schema)
