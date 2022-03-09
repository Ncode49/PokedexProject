import jwt from 'jsonwebtoken'
import config from '../../config/config'
import { createCatchErrorMessage, APIError } from '../Error'
export type TokenS = {
  type: 'success'
  token: string
}

export type PayloadTokenSuccess = {
  type: 'success'
  payload: PayLoadToken
}
export type PayLoadToken = {
  user_uuid: string
}
export type TokenOptions = {
  algorithm: string
  expiresIn: string
}
export type GenerateToken = TokenS | APIError
export type GenerateAccessTokenServiceType = (
  payload: PayLoadToken
) => GenerateToken
export type GenerateRefreshTokenServiceType = (
  payload: PayLoadToken
) => GenerateToken
type VerifyTokenResultType = PayloadTokenSuccess | APIError
type SignOptions = jwt.SignOptions
type VerifyAccessTokenServiceType = (
  token: string
) => PayloadTokenSuccess | APIError
type VerifyRefreshTokenServiceType = (
  token: string
) => PayloadTokenSuccess | APIError
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

const verifyToken = (token: string, secret: string): VerifyTokenResultType => {
  try {
    jwt.verify(token, secret)
    const decoded = jwt.decode(token) as PayLoadToken
    return payloadSuccess(decoded)
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

// use uuid in the payload

const generateToken = (
  payload: PayLoadToken,
  config: string,
  tokenOptions: SignOptions
): GenerateToken => {
  try {
    const token = jwt.sign(payload, config, tokenOptions)
    return tokenSuccess(token)
  } catch (error) {
    return createCatchErrorMessage(error)
  }
}

export const generateAccessToken: GenerateAccessTokenServiceType = (
  payload: PayLoadToken
) => {
  return generateToken(payload, config.server.token.accessTokenSecret, {
    algorithm: 'HS256',
    expiresIn: '1y',
  })
}

export const generateRefreshToken: GenerateRefreshTokenServiceType = (
  payload: PayLoadToken
) => {
  return generateToken(payload, config.server.token.refreshTokenSecret, {
    algorithm: 'HS256',
    expiresIn: '1y',
  })
}

const tokenSuccess = (token: string): TokenS => {
  return {
    type: 'success',
    token: token,
  }
}

const payloadSuccess = (decoded: PayLoadToken): PayloadTokenSuccess => {
  return {
    type: 'success',
    payload: decoded,
  }
}
