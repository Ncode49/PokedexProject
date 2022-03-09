import { Request, Response } from 'express'
import { createCatchErrorMessage, createErrorMessage } from '../services'
import { AuthServiceType } from './AuthService'
export type AuthRegisterType = (
  req: Request,
  res: Response
) => Promise<Response<any, Record<any, string>>>
export type AuthLoginType = (
  req: Request,
  res: Response
) => Promise<Response<any, Record<any, string>>>
export type AuthRefreshTokenType = (
  req: Request,
  res: Response
) => Promise<Response<any, Record<string, any>>>
export type AuthValidateTokenType = (
  req: Request,
  res: Response
) => Response<any, Record<string, any>>
export type AuthControllerType = {
  register: AuthRegisterType
  login: AuthLoginType
  refreshToken: AuthRefreshTokenType
  validateToken: AuthValidateTokenType
}

export const AuthControllerDI = (authService: AuthServiceType) => {
  return {
    login: login(authService),
    register: register(authService),
    refreshToken: refreshToken(authService),
    validateToken: validateToken,
  }
}
// authcontroller.register(service a utiliser par a injecter par AuthService) qui sont les méthodes a utiliser
const login =
  (authService: AuthServiceType): AuthLoginType =>
  async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body
      const data = await authService.login(username, password)
      if (data.type == 'error') return res.status(400).json(data)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json(createCatchErrorMessage(error))
    }
  }

const refreshToken =
  (authService: AuthServiceType): AuthRefreshTokenType =>
  async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization?.split(' ')[1]
      if (token === undefined)
        return res
          .status(400)
          .json(createErrorMessage('token is undefined unauthorized'))

      const tokenOrError = await authService.refreshToken(token)
      if (tokenOrError.type == 'error')
        return res.status(400).json(tokenOrError)

      return res.status(200).json({ accessToken: tokenOrError })
    } catch (error) {
      return res.status(500).json(createCatchErrorMessage(error))
    }
  }

const validateToken: AuthValidateTokenType = (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'Token(s) validated',
  })
}

const register =
  (authService: AuthServiceType): AuthRegisterType =>
  async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body
      const message = await authService.register(username, password)
      if (message.type == 'success') return res.status(200).json(message)
      return res.status(500).json(message)
    } catch (error) {
      return res.status(400).json(createCatchErrorMessage(error))
    }
  }
