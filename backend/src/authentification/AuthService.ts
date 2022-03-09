import {
  APIError,
  createCatchErrorMessage,
  CryptoServiceType,
  TokenS,
  JWTServiceType,
  UserRepositoryType,
} from '../services'
import { MessageS } from '../services/Repository/utils'
type AccessRefreshTokenS = {
  type: 'success'
  accessToken: string
  refreshToken: string
}
export type LoginAuthServiceType = (
  username: string,
  password: string
) => Promise<APIError | AccessRefreshTokenS>
export type RegisterAuthServiceType = (
  username: string,
  password: string
) => Promise<MessageS | APIError>
export type RefreshAuthServiceType = (token: string) => TokenS | APIError
export type AuthServiceType = {
  login: LoginAuthServiceType
  register: RegisterAuthServiceType
  refreshToken: RefreshAuthServiceType
}
export const AuthService = (
  userRepository: UserRepositoryType,
  cryptoService: CryptoServiceType,
  jwtService: JWTServiceType
) => {
  return {
    login: login(userRepository, cryptoService, jwtService),
    register: register(userRepository, cryptoService),
    refreshToken: refreshToken(jwtService),
  }
}

const login =
  (
    userRepository: UserRepositoryType,
    cryptoService: CryptoServiceType,
    jwtService: JWTServiceType
  ): LoginAuthServiceType =>
  async (username: string, password: string) => {
    try {
      const data = await userRepository.getPasswordHashByUsername(
        username,
        password
      )
      if (data.type === 'error') return data
      const message = await cryptoService.compareHash(
        password,
        data.password_hash
      )
      if (message.type === 'error') return message
      if (!message.bool) {
        const err: APIError = {
          type: 'error',
          message: 'password incorrect',
        }
        return err
      }
      const accessTokenResult = jwtService.generateAccessToken(username)
      if (accessTokenResult.type === 'error') return accessTokenResult
      const refreshTokenResult = jwtService.generateRefreshToken(username)
      if (refreshTokenResult.type === 'error') return refreshTokenResult
      // obliger pour typer le retour
      const success: AccessRefreshTokenS = {
        type: 'success',
        accessToken: accessTokenResult.token,
        refreshToken: refreshTokenResult.token,
      }
      return success
    } catch (error) {
      return createCatchErrorMessage(error)
    }
  }

const refreshToken =
  (jwtService: JWTServiceType): RefreshAuthServiceType =>
  (token: string) => {
    try {
      const payload = jwtService.verifyRefreshToken(token)
      if (payload.type === 'error') return payload
      return jwtService.generateAccessToken(payload.payload.username)
    } catch (error) {
      return createCatchErrorMessage(error)
    }
  }
const register =
  (
    userRepository: UserRepositoryType,
    cryptoService: CryptoServiceType
  ): RegisterAuthServiceType =>
  async (username: string, password: string) => {
    try {
      const hashResult = await cryptoService.hashPassword(password)
      if (hashResult.type == 'error') return hashResult
      return userRepository.addUser(username, hashResult.hash)
    } catch (error) {
      return createCatchErrorMessage(error)
    }
  }
