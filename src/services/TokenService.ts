import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongoose'

import config from '../../config'
import UserDto from '../dtos/UserDto'
import Token from '../models/Token'

class TokenService {
  generateToken(payload: any) {
    const accessToken = jwt.sign(payload, config.access_secret, {
      expiresIn: '15m',
    })
    const refreshToken = jwt.sign(payload, config.refresh_secret, {
      expiresIn: '30d',
    })

    return {
      accessToken,
      refreshToken,
    }
  }

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, config.access_secret)
      return userData
    } catch (error) {
      return null
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = <any>jwt.verify(token, config.refresh_secret)

      return userData
    } catch (error) {
      return null
    }
  }

  async saveToken(userId: ObjectId, refreshToken: string) {
    const isExist = await Token.findOne({ user: userId })

    if (isExist) {
      isExist.refreshToken = refreshToken
      return await isExist.save()
    }

    const token = await Token.create({
      user: userId,
      refreshToken,
    })

    return token
  }

  async removeToken(refreshToken: string) {
    const tokenData = await Token.deleteOne({ refreshToken })

    return tokenData
  }

  async findToken(refreshToken: string) {
    const tokenData = await Token.findOne({ refreshToken })

    return tokenData
  }
}

export default new TokenService()
