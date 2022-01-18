import { Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import path from 'path'
import UserDto from '../dtos/UserDto'

import userService from '../services/UserService'

class UserController {
  async getAll(req: Request, res: Response) {
    const users = await userService.getAllUsers()
    const response = users.map((user) => new UserDto(user))

    res.json(response)
  }

  async updateUser(req: Request, res: Response) {
    const data = req.body
    if (req.files) {
      const avatar = req.files.avatar as UploadedFile
      const ext = avatar.mimetype.split('/')[1]
      const fullName = `${avatar.md5}.${ext}`
      const filePath = `${__dirname}/../uploads/${fullName}`
      avatar.mv(filePath)
      data.avatar = `/files/${fullName}`
    }

    const { id } = req.params

    const response = await userService.updateUser(id, data)
    res.json(response)
  }
}

export default new UserController()
