import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongoose'
import UserDto from '../dtos/UserDto'

import userService from '../services/UserService'

class UserController {
  async getAll(req: Request, res: Response) {
    const users = await userService.getAllUsers()
    const response = users.map((user) => new UserDto(user))

    res.json(response)
  }
}

export default new UserController()
