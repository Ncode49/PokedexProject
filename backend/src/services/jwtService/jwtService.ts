import jwt from 'jsonwebtoken'
import config from '../../config/config'
import { createCatchErrorMessage, APIError } from '../Error'
export type GenerateToken = TokenS | APIError
export type GenerateAccessTokenServiceType = (user: string) => GenerateToken
export type GenerateRefreshTokenServiceType = (user: string) => GenerateToken
type VerifyTokenResultType = PayloadS | APIError
type SignOptions = jwt.SignOptions
type VerifyAccessTokenServiceType = (token: string) => PayloadS | APIError
type VerifyRefreshTokenServiceType = (token: string) => PayloadS | APIError
export type JWTServiceType = {
  generateAccessToken: GenerateAccessTokenServiceType
  generateRefreshToken: GenerateRefreshTokenServiceType
  verifyRefreshToken: VerifyRefreshTokenServiceType
  verifyAccessToken: VerifyAccessTokenServiceType
}

export const JWTService = (): JWTServiceType => {
  return {
    generateAccessToken: generateAccessToken,
    generateRefreshToken: generateRefreshToken,
    verifyRefreshToken: verifyRefreshToken,
    verifyAccessToken: verifyAccessToken,
  }
}
export type TokenS = {
  type: 'success'
  token: string
}

export type PayloadS = {
  type: 'success'
  payload: Payload
}

export type TokenOptions = {
  algorithm: string
  expiresIn: string
}

export type Payload = {
  username: string
}
const verifyToken = (token: string, secret: string): VerifyTokenResultType => {
  try {
    jwt.verify(token, secret)
    const decoded = jwt.decode(token) as Payload
    return {
      type: 'success',
      payload: decoded,
    }
  } catch (error) {
    return createCatchErrorMessage(error)
  }
}

const verifyRefreshToken: VerifyAccessTokenServiceType = (token: string) => {
  return verifyToken(token, config.server.token.refreshTokenSecret)
}

const verifyAccessToken: VerifyRefreshTokenServiceType = (token: string) => {
  return verifyToken(token, config.server.token.accessTokenSecret)
}

const generateToken = (
  user: string,
  config: string,
  tokenOptions: SignOptions
): GenerateToken => {
  try {
    const token = jwt.sign({ user }, config, tokenOptions)
    return {
      type: 'success',
      token: token,
    }
  } catch (error) {
    return createCatchErrorMessage(error)
  }
}
// durée de vie courte
export const generateAccessToken: GenerateAccessTokenServiceType = (
  user: string
) => {
  return generateToken(user, config.server.token.accessTokenSecret, {
    algorithm: 'HS256',
    expiresIn: '1y',
  })
}

// durée de vie longue
export const generateRefreshToken: GenerateRefreshTokenServiceType = (
  user: string
) => {
  return generateToken(user, config.server.token.refreshTokenSecret, {
    algorithm: 'HS256',
    expiresIn: '1y',
  })
}
