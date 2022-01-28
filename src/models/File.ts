import mongoose, { model, ObjectId, Schema } from 'mongoose'

export enum FileTypes {
  AVATAR = 'avatar',
  POSTER = 'poster',
}

export interface File {
  src: string
  user: ObjectId
  type: FileTypes
  name: string
  md5: string
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
    type: {
      enum: FileTypes,
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    md5: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
)

export default model('File', schema)
