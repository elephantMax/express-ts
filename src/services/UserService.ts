import { ObjectId } from 'mongoose'
import bcrypt from 'bcrypt'

import User, { User as UserType } from '../models/User'
import TokenService from './TokenService'
import UserDto from '../dtos/UserDto'
import ApiError from '../exceptions/api-error'

class UserService {
  async getAllUsers() {
    return await User.find({}).lean()
  }

  async getUserByLoginPassword({
    login,
    password,
  }: {
    login: string
    password: string
  }) {
    return await User.findOne({ login, password }).lean()
  }

  async createUser(user: UserType) {
    const isExist = await User.findOne({ login: user.login })

    if (isExist) {
      throw ApiError.BadRequest('Данный пользоваьель уже существует')
    }

    const hashPassword = await bcrypt.hash(user.password, 3)

    const newUser = await User.create({
      ...user,
      password: hashPassword,
    })

    const userDto = new UserDto(newUser)
    const tokens = TokenService.generateToken({ ...userDto })

    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }

  async login({ login, password }: UserType) {
    const user = await User.findOne({ login })

    if (!user) {
      throw ApiError.BadRequest('Пользоватьель не был найден')
    }

    const isPassEquals = await bcrypt.compare(password, user.password)

    if (!isPassEquals) {
      throw ApiError.BadRequest('Неверный пароль')
    }

    const userDto = new UserDto(user)
    const tokens = TokenService.generateToken({ ...userDto })

    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }

  async logout(refreshToken: string) {
    const token = await TokenService.removeToken(refreshToken)

    return token
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }
    const userData = TokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await TokenService.findToken(refreshToken)

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError()
    }

    const user = await User.findById(userData.id)

    const userDto = new UserDto(user)
    const tokens = TokenService.generateToken({ ...userDto })

    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }

  async updateUser(id: string, user: UserType) {
    await User.findByIdAndUpdate(id, user)

    const userData = await User.findById(id)
    const userDto = new UserDto(userData)

    return { ...userDto }
  }

  async removeById(id: ObjectId) {
    return await User.findByIdAndRemove(id)
  }
}

export default new UserService()
